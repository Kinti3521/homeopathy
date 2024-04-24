/*
* Q) Write a C program to count nnumber of characters, words and lines in a text file. Logic to count number of characters, words and lines in a text file in C programming.How to count number of characters, words and lines in a text file in C programming.
 */

/*
───────┬───────────────────────────────────────────────────────────────────────────────────────────────
       │ File: test.txt
───────┼───────────────────────────────────────────────────────────────────────────────────────────────
   1   │ Hello world 
   2   │ I dont know what more to say 
   3   │ so gn
───────┴───────────────────────────────────────────────────────────────────────────────────────────────
*/

#include <stdio.h>

int main() {
    FILE *file;
    char filename[100];
    char ch;
    int charCount = 0, wordCount = 0, lineCount = 0, spaceCount = 0, inWord = 0;

    // Get the filename from the user
    printf("Enter the filename: ");
    scanf("%s", filename);

    // Open the file in read mode
    file = fopen(filename, "r");

    // Check if the file exists
    if (file == NULL) {
        printf("File not found or unable to open.\n");
        return 1; // Exit the program with an error code
    }

    // Read the characters from the file and count characters, words, spaces, and lines
    while ((ch = fgetc(file)) != EOF) {
        charCount++;

        // Check for a new line
        if (ch == '\n') {
            lineCount++;
        }

        // Check for a space
        if (ch == ' ' || ch == '\t') {
            spaceCount++;
            inWord = 0; // Reset the flag indicating that we are in a word
        } else {
            // Check for the start of a word
            if (inWord == 0) {
                inWord = 1;
                wordCount++;
            }
        }
    }

    // Close the file
    fclose(file);

    // Display the results
    printf("Total characters: %d\n", charCount);
    printf("Total words: %d\n", wordCount);
    printf("Total spaces: %d\n", spaceCount);
    printf("Total lines: %d\n", lineCount);

    return 0;
}

/*
Output:

Enter the filename: test.txt
Total characters: 49
Total words: 11
Total spaces: 10
Total lines: 3
*/



















































/*
Introduction to programming and programming language

Introduction:
A programming language is a set of instructions and syntax used to create software programs. Some of the key features of programming languages include:
1.	Syntax: The specific rules and structure used to write code in a programming language.
2.	Data Types: The type of values that can be stored in a program, such as numbers, strings, and booleans.
3.	Variables: Named memory locations that can store values.
4.	Operators: Symbols used to perform operations on values, such as addition, subtraction, and comparison.
5.	Control Structures: Statements used to control the flow of a program, such as if-else statements, loops, and function calls.
6.	Libraries and Frameworks: Collections of pre-written code that can be used to perform common tasks and speed up development.
7.	Paradigms: The programming style or philosophy used in the language, such as procedural, object-oriented, or functional.
Examples of popular programming languages include Python, Java, C++, JavaScript, and Ruby. Each language has its own strengths and weaknesses and is suited for different types of projects.
A programming language is a formal language that specifies a set of instructions for a computer to perform specific tasks. It’s used to write software programs and applications, and to control and manipulate computer systems. There are many different programming languages, each with its own syntax, structure, and set of commands. Some of the most commonly used programming languages include Java, Python, C++, JavaScript, and C#. The choice of programming language depends on the specific requirements of a project, including the platform being used, the intended audience, and the desired outcome. Programming languages continue to evolve and change over time, with new languages being developed and older ones being updated to meet changing needs.
Are you aiming to become a software engineer one day? Do you also want to develop a mobile application that people all over the world would love to use? Are you passionate enough to take the big step to enter the world of programming? Then you are in the right place because through this article you will get a brief introduction to programming. Now before we understand what programming is, you must know what is a computer. A computer is a device that can accept human instruction, processes it, and responds to it or a computer is a computational device that is used to process the data under the control of a computer program. Program is a sequence of instruction along with data. 
The basic components of a computer are: 
1.	Input unit
2.	Central Processing Unit(CPU)
3.	Output unit
The CPU is further divided into three parts-  
•	Memory unit
•	Control unit
•	Arithmetic Logic unit
Most of us have heard that CPU is called the brain of our computer because it accepts data, provides temporary memory space to it until it is stored(saved) on the hard disk, performs logical operations on it and hence processes(here also means converts) data into information. We all know that a computer consists of hardware and software. Software is a set of programs that performs multiple tasks together. An operating system is also software (system software) that helps humans to interact with the computer system. 
A program is a set of instructions given to a computer to perform a specific operation. or computer is a computational device that is used to process the data under the control of a computer program. While executing the program, raw data is processed into the desired output format. These computer programs are written in a programming language which are high-level languages. High level languages are nearly human languages that are more complex than the computer understandable language which are called machine language, or low level language. So after knowing the basics, we are ready to create a very simple and basic program. Like we have different languages to communicate with each other, likewise, we have different languages like C, C++, C#, Java, python, etc to communicate with the computers. The computer only understands binary language (the language of 0’s and 1’s) also called machine-understandable language or low-level language but the programs we are going to write are in a high-level language which is almost similar to human language. 
The piece of code given below performs a basic task of printing “hello world! I am learning programming” on the console screen. We must know that keyboard, scanner, mouse, microphone, etc are various examples of input devices, and monitor(console screen), printer, speaker, etc are examples of output devices. 
At this stage, you might not be able to understand in-depth how this code prints something on the screen. The main() is a standard function that you will always include in any program that you are going to create from now onwards. Note that the execution of the program starts from the main() function. The clrscr() function is used to see only the current output on the screen while the printf() function helps us to print the desired output on the screen. Also, getch() is a function that accepts any character input from the keyboard. In simple words, we need to press any key to continue(some people may say that getch() helps in holding the screen to see the output). 
Between high-level language and machine language, there are assembly languages also called symbolic machine code. Assembly languages are particularly computer architecture specific. Utility program (Assembler) is used to convert assembly code into executable machine code. High Level Programming Language is portable but requires Interpretation or compiling to convert it into a machine language that is computer understood. 
Hierarchy of Computer language – 









Most Popular Programming Languages –  
•	C
•	Python
•	C++
•	Java
•	SCALA
•	C#
•	R
•	Ruby
•	Go
•	Swift
•	JavaScript

Characteristics of a programming Language – 

•	A programming language must be simple, easy to learn and use, have good readability, and be human recognizable.
•	Abstraction is a must-have Characteristics for a programming language in which the ability to define the complex structure and then its degree of usability comes.
•	A portable programming language is always preferred.
•	Programming language’s efficiency must be high so that it can be easily converted into a machine code and its execution consumes little space in memory.
•	A programming language should be well structured and documented so that it is suitable for application development.
•	Necessary tools for the development, debugging, testing, maintenance of a program must be provided by a programming language.
•	A programming language should provide a single environment known as Integrated Development Environment(IDE).
•	A programming language must be consistent in terms of syntax and semantics.

Basic Terminologies  in Programming Languages:

•	Algorithm: A step-by-step procedure for solving a problem or performing a task.
•	Variable: A named storage location in memory that holds a value or data.
•	Data Type: A classification that specifies what type of data a variable can hold, such as integer, string, or boolean.
•	Function: A self-contained block of code that performs a specific task and can be called from other parts of the program.
•	Control Flow: The order in which statements are executed in a program, including loops and conditional statements.
•	Syntax: The set of rules that govern the structure and format of a programming language.
•	Comment: A piece of text in a program that is ignored by the compiler or interpreter, used to add notes or explanations to the code.
•	Debugging: The process of finding and fixing errors or bugs in a program.
•	IDE: Integrated Development Environment, a software application that provides a comprehensive development environment for coding, debugging, and testing.
•	Operator: A symbol or keyword that represents an action or operation to be performed on one or more values or variables, such as + (addition), – (subtraction), * (multiplication), and / (division).
•	Statement: A single line or instruction in a program that performs a specific action or operation.

Advantages of programming languages:
1.	Increased Productivity: Programming languages provide a set of abstractions that allow developers to write code more quickly and efficiently.
2.	Portability: Programs written in a high-level programming language can run on many different operating systems and platforms.
3.	Readability: Well-designed programming languages can make code more readable and easier to understand for both the original author and other developers.
4.	Large Community: Many programming languages have large communities of users and developers, which can provide support, libraries, and tools.
Disadvantages of programming languages:
1.	Complexity: Some programming languages can be complex and difficult to learn, especially for beginners.
2.	Performance: Programs written in high-level programming languages can run slower than programs written in lower-level languages.
3.	Limited Functionality: Some programming languages may not have built-in support for certain types of tasks or may require additional libraries to perform certain functions.
4.	Fragmentation: There are many different programming languages, which can lead to fragmentation and make it difficult to share code and collaborate with other developers.

Tips for learning new programming language:

1.	Start with the fundamentals: Begin by learning the basics of the language, such as syntax, data types, variables, and simple statements. This will give you a strong foundation to build upon.
2.	Code daily: Like any skill, the only way to get good at programming is by practicing regularly. Try to write code every day, even if it’s just a few lines.
3.	Work on projects: One of the best ways to learn a new language is to work on a project that interests you. It could be a simple game, a web application, or anything that allows you to apply what you’ve learned that is the most important part.
4.	Read the documentation: Every programming language has documentation that explains its features, syntax, and best practices. Make sure to read it thoroughly to get a better understanding of the language.
5.	Join online communities: There are many online communities dedicated to programming languages, where you can ask questions, share your code, and get feedback. Joining these communities can help you learn faster and make connections with other developers.
6.	Learn from others: Find a mentor or someone who is experienced in the language you’re trying to learn. Ask them questions, review their code, and try to understand how they solve problems.
7.	Practice debugging: Debugging is an essential skill for any programmer, and you’ll need to do a lot of it when learning a new language. Make sure to practice identifying and fixing errors in your code.
*/