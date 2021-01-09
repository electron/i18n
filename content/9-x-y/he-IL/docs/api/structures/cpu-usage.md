# הרכיב CPUUsage

* `percentCPUUsage` מספר - אחוז השימוש בCPU מאז הקריאה האחרונה לgetCPUUsage. הקריאה הראשונה מחזירה 0.
* `idleWakeupsPerSecond` מספר - המספר הממוצע של ההתעורריות ממצב סרק של המעבד בכל שניה מאז הקריאה האחרונה ל getCPUUsage. הקריאה הראשונה מחזירה 0. תמיד יחזיר 0 על Windows.
