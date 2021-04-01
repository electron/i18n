# Patches in Electron

Electron basiert auf zwei großen vorgelagerten Projekten: Chrom und Node.js. Jedes dieser Projekte hat auch mehrere eigene Abhängigkeiten. Wir versuchen unser Bestes, um diese Abhängigkeiten genau so zu nutzen, wie sie sind, aber manchmal können wir unsere Ziele nicht erreichen, ohne diese vorgelagerten Abhängigkeiten zu patchen, um unsere Anwendungsfälle anzupassen.

## Patch-Begründung

Jeder Patch in Electron ist eine Wartungslast. Wenn sich der Originalcode ändert, können Patches brechen – manchmal auch ohne Patchkonflikt oder Kompilierungsfehler. Es ist eine kontinuierliche Anstrengung, um unser Patch auf dem neuesten Stand und effektiv zu halten. Daher bemühen wir uns, unsere Patchanzahl auf ein Minimum zu beschränken. Zu diesem Zweck muss jeder Patch seinen Grund für die Existenz in seiner Commit-Nachricht beschreiben. Dieser Grund muss einer der folgenden sein:

1. Der Patch ist temporär und soll vorgelagert oder anderweitig entfernt werden (oder wurde). Fügen Sie einen Link zu einer Upstream-PR- oder Codeüberprüfung ein, falls verfügbar, oder ein Verfahren zum Überprüfen, ob der Patch zu einem späteren Zeitpunkt noch benötigt wird.
2. Der Patch ermöglicht es dem Code, in der Electron-Umgebung zu kompilieren, kann aber nicht vorgelagert werden, da er elektronenspezifisch ist (z. B. Patchen von Verweisen auf Chromes `Profile`). Geben Sie Überlegungen darüber an, warum die Änderung nicht ohne Patch implementiert werden kann (z. B. durch Unterklassen oder Kopieren des Codes).
3. Der Patch nimmt elektronenspezifische Änderungen in der Funktionalität vor, die grundsätzlich nicht mit upstream kompatibel sind.

Im Allgemeinen sind alle vorgelagerten Projekte, mit denen wir zusammenarbeiten, freundliche Leute und akzeptieren oft gerne Umgestaltungen, die es ermöglichen, dass der betreffende Code sowohl mit Electron als auch mit dem Upstream-Projekt kompatibel ist. (Siehe z.B. [diese](https://chromium-review.googlesource.com/c/chromium/src/+/1637040) Änderung in Chrom, die es uns erlaubte, einen Patch zu entfernen, der dasselbe tat, oder [diese](https://github.com/nodejs/node/pull/22110) Änderung in Node, die ein No-op für Node war, aber einen Fehler in Electron behoben hat.) **Wir sollten darauf abzielen, Vorlaufänderungen vorzunehmen, wann immer wir können, und Patches für die unbegrenzte Lebensdauer**vermeiden.

## Patch-System

Wenn Sie sich in der unglücklichen Lage befinden, eine Änderung vornehmen zu müssen, die nur durch Patchen eines Upstream-Projekts vorgenommen werden kann, müssen Sie wissen, wie Patches in Electron verwaltet werden.

Alle Patches für Vorgelagerte Projekte in Electron sind im Verzeichnis `patches/` enthalten. Jedes Unterverzeichnis von `patches/` enthält mehrere Patch-Dateien, zusammen mit einer `.patches` -Datei, die die Reihenfolge auflistet, in der die Patches angewendet werden sollen. Stellen Sie sich diese Dateien als eine Reihe von Git-Commits vor, die nach dem Auschecken auf das Upstream-Projekt angewendet werden.

```text
Patches
config.json   <-- dies beschreibt, auf welches Projekt
-- Chromium-
- .patches
⋮
⋮
build_add_gn_build_files
add_openssl_is_boringssl_guard_to_oaep_hash_check

⋮

add_contentgpuclient_precreatemessageloop_callback
.
```

Um diese Patch-Sets zu verwalten, stellen wir zwei Tools bereit: `git-import-patches` und `git-export-patches`. `git-import-patches` importiert eine Reihe von Patchdateien in ein Git-Repository, indem jeder Patch in der richtigen Reihenfolge angewendet und für jeden Patch ein Commit erstellt wird. `git-export-patches` macht das Gegenteil; Es exportiert eine Reihe von Git-Commits in einem Repository in eine Reihe von Dateien in einem Verzeichnis und eine begleitende `.patches` -Datei.

> Randbemerkung: Der Grund, warum wir eine `.patches` -Datei verwenden, um die Reihenfolge der angewendeten Patches beizubehalten, anstatt eine Zahl wie `001-` zu jeder Datei vorzuspeichern, ist, dass dadurch Konflikte im Zusammenhang mit der Patchreihenfolge reduziert werden. Es verhindert die Situation, dass zwei PRs beide einen Patch am Ende der Serie mit der gleichen Nummerierung hinzufügen und am Ende beide zusammengeführt werden, was zu einem doppelten Bezeichner führt, und es reduziert auch die Abwanderung, wenn ein Patch in der Mitte der Serie hinzugefügt oder gelöscht wird.

### Beispiel

#### Hinzufügen eines neuen Patches

```bash
$ cd src/third_party/electron_node
- vim some/code/file.cc
git commit
. /.. /electron/script/git-export-patches -o .. /.. /electron/patches/node
```

> **HINWEIS**: `git-export-patches` ignoriert alle nicht festgeschriebenen Dateien, daher müssen Sie einen Commit erstellen, wenn Sie möchten, dass Ihre Änderungen exportiert werden. Die Betreffzeile der Commitnachricht wird verwendet, um den Patchdateinamen abzuleiten, und der Text der Commitnachricht sollte den Grund für das Vorhandensein des Patches enthalten.

Das erneute Exportieren von Patches führt manchmal dazu, dass sich Shasums in nicht verwandten Patches ändern. Dies ist im Allgemeinen harmlos und kann ignoriert werden (aber gehen Sie vor und fügen Sie diese Änderungen zu Ihrer PR hinzu, es wird sie davon abhalten, für andere Personen zu zeigen).

#### Bearbeiten eines vorhandenen Patches

```bash
$ cd src/v8
- vim some/code/file.cc
' git log
' Suchen Sie den Commit-Sha des Patches, den Sie bearbeiten möchten.
$ git commit --fixup [COMMIT_SHA]
$ git rebase --autosquash -i [COMMIT_SHA].
. /electron/script/git-export-patches -o .. /electron/patches/v8
```

#### Entfernen eines Patches

```bash
$im src/electron/patches/node/.patches
- Löschen Sie die Zeile mit dem Namen des Patches, den Sie entfernen möchten,
cd src/third_party/electron_node
- git reset --hard refs/patches/upstream-head
. /.. /electron/script/git-import-patches .. /.. /electron/patches/node
. /.. /electron/script/git-export-patches -o .. /.. /electron/patches/node
```

Beachten Sie, dass `git-import-patches` den Commit markiert, der `HEAD` wurde, als er ausgeführt wurde, als `refs/patches/upstream-head`. Auf diese Weise können Sie nachverfolgen, welche Commits von Electron-Patches stammen (die nach `refs/patches/upstream-head`) und welche Commits sich im Upstream befinden (die vor `refs/patches/upstream-head`).

#### Konflikte beheben

Beim Aktualisieren einer Upstream-Abhängigkeit können Patches möglicherweise nicht ordnungsgemäß angewendet werden. Häufig kann der Konflikt automatisch durch git mit einer 3-Wege-Zusammenführung gelöst werden. Sie können `git-import-patches` anweisen, den 3-Wege-Zusammenführungsalgorithmus zu verwenden, indem Sie das argument `-3` übergeben:

```bash
electron_node
third_party Wenn die Patch-Anwendung in der Mitte des Vorgangs fehlgeschlagen ist, können Sie sie zurücksetzen mit:
--abort
- Und wiederholen Sie dann mit 3-Wege-Zusammenführung:
. /.. /electron/script/git-import-patches -3 .. /.. /electron/patches/node
```

Wenn `git-import-patches -3` auf einen Zusammenführungskonflikt stößt, den er nicht automatisch lösen kann, wird er angehalten und ermöglicht es Ihnen, den Konflikt manuell zu lösen. Nachdem Sie den Konflikt gelöst haben, `git add` die aufgelösten Dateien und wenden Sie die restlichen Patches weiter an, indem Sie `git am --continue`ausführen.
