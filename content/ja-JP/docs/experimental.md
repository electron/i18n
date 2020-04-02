# 実験的な API

いくつかの Electrons API のドキュメントには、`_Experimental_` というタグが付けられています。 このタグは、その API が不安定であろうと考えられており、他の API に比べて警告をあまりせずに API の削除や変更が頻繁に行われるかもしれないということです。

## API が Experimental とタグ付けされる条件

新機能の PR では、誰でも API を実験的なものとしてタグ付けるよう要求できます。新機能が実験的かどうかに関する意見の相違が PR で解決できない場合、API WG で議論にかけることができます。

## Process for removing the Experimental tag

Once an API has been stable and in at least two major stable release lines it can be nominated to have its experimental tag removed.  This discussion should happen at an API WG meeting.  Things to consider when discussing / nominating:

* The above "two major stables release lines" condition must have been met
* During that time no major bugs / issues should have been caused by the adoption of this feature
* The API is stable enough and hasn't been heavily impacted by Chromium upgrades
* Is anyone using the API?
* Is the API fulfilling the original proposed usecases, does it have any gaps?
