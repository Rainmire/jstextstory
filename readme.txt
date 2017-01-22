Engine for text-based interactive story
Made for node js
/////////////////////
Create a text file following the format below and change line 5 of main.js to your file path (or just use the given text sample).
Run using node js

INPUT INSTRUCTIONS:
**Paragraph number**
[[Body of one paragraph]]
<<choice1~paragraph number to jump to|choice2~paragraph number to jump to>>

Paragraph number 1 is the starting point of the story
All paragraph numbers must be 1 or greater, but not necessarily consecutive
Use paragraph number 0 in choice to indicate end of program (ie: <<~0>>)
Enter "quit" at any time to quit the program