const fs = require('fs');

// Define token types
const TokenType = {
  OPERATOR: 'Operator',
  KEYWORD: 'Keyword',
  IDENTIFIER: 'Identifier',
  TEXT_LITERAL: 'TextLiteral',
  INTEGER_LITERAL: 'IntegerLiteral',
  FLOAT_LITERAL: 'FloatLiteral',
  COMMENT: 'Comment',
  ERROR: 'Error'
};

// Define keywords
const keywords = new Set(['if', 'else', 'while', 'for', 'function', 'return', 'var', 'let', 'const']);

// Define operators
const operators = new Set(['+', '-', '*', '/', '=', '==', '===', '!=', '!==', '>', '<', '>=', '<=', '&&', '||', '!', '++', '--']);

// Function to tokenize input string
function tokenize(input) {
  const tokens = [];
  const lines = input.split('\n');

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let position = 0;

    while (position < line.length) {
      let char = line[position];

      // Skip whitespace
      if (char.match(/\s/)) {
        position++;
        continue;
      }

      // Comments
      if (char === '/' && line[position + 1] === '/') {
        tokens.push({ type: TokenType.COMMENT, value: line.slice(position), line: i + 1 });
        break;
      }

      // Operators
      if (operators.has(char)) {
        tokens.push({ type: TokenType.OPERATOR, value: char, line: i + 1 });
        position++;
        continue;
      }

      // Identifiers or Keywords
      if (char.match(/[a-zA-Z_]/)) {
        let identifier = '';
        while (char && (char.match(/[a-zA-Z0-9_]/) || char === '.')) {
          identifier += char;
          position++;
          char = line[position];
        }
        if (keywords.has(identifier)) {
          tokens.push({ type: TokenType.KEYWORD, value: identifier, line: i + 1 });
        } else {
          tokens.push({ type: TokenType.IDENTIFIER, value: identifier, line: i + 1 });
        }
        continue;
      }

      // Text Literals
      if (char === '"' || char === "'") {
        let endQuoteIndex = line.indexOf(char, position + 1);
        if (endQuoteIndex === -1) {
          tokens.push({ type: TokenType.ERROR, value: 'Unmatched quote', line: i + 1 });
          break;
        }
        tokens.push({ type: TokenType.TEXT_LITERAL, value: line.slice(position, endQuoteIndex + 1), line: i + 1 });
        position = endQuoteIndex + 1;
        continue;
      }

      // Numbers
      if (char.match(/[0-9]/)) {
        let num = '';
        while (char && (char.match(/[0-9\.]/))) {
          num += char;
          position++;
          char = line[position];
        }
        if (num.includes('.')) {
          tokens.push({ type: TokenType.FLOAT_LITERAL, value: parseFloat(num), line: i + 1 });
        } else {
          tokens.push({ type: TokenType.INTEGER_LITERAL, value: parseInt(num), line: i + 1 });
        }
        continue;
      }

      // Unrecognized character
      tokens.push({ type: TokenType.ERROR, value: 'Unrecognized character', line: i + 1 });
      position++;
    }
  }

  return tokens;
}

// Test input strings
const testStrings = [
  'var x = 5;',
  'if (x === 5) { return "Hello"; } // This is a comment',
  'function add(a, b) { return a + b; }',
  '1.23 + 4 * 5',
  '"This is a text literal"',
  'invalid !@# characters'
];

// Test the lexical analyzer
testStrings.forEach((str, index) => {
  console.log(`\nInput String ${index + 1}:`);
  console.log(str);
  const tokens = tokenize(str);
  console.log('Tokens:');
  console.log(tokens);
});

// reading txt for lexical analyzer
const textFile = "./hello.txt";
const content = fs.readFileSync(textFile, 'utf8');

const tokens = tokenize(content);
console.log('File Tokens:');
console.log(tokens);

/*
───────┬───────────────────────────────────────────────────────────────────────────────────────────────
       │ File: hello.txt
───────┼───────────────────────────────────────────────────────────────────────────────────────────────
   1   │ let x = 1;
   2   │ x = 2;
   3   │ data = 2;
───────┴───────────────────────────────────────────────────────────────────────────────────────────────
*/

/*
 Output:

Input String 1:
var x = 5;
Tokens:
[
  { type: 'Keyword', value: 'var', line: 1 },
  { type: 'Identifier', value: 'x', line: 1 },
  { type: 'Operator', value: '=', line: 1 },
  { type: 'IntegerLiteral', value: 5, line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 }
]

Input String 2:
if (x === 5) { return "Hello"; } // This is a comment
Tokens:
[
  { type: 'Keyword', value: 'if', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Identifier', value: 'x', line: 1 },
  { type: 'Operator', value: '=', line: 1 },
  { type: 'Operator', value: '=', line: 1 },
  { type: 'Operator', value: '=', line: 1 },
  { type: 'IntegerLiteral', value: 5, line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Keyword', value: 'return', line: 1 },
  { type: 'TextLiteral', value: '"Hello"', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Comment', value: '// This is a comment', line: 1 }
]

Input String 3:
function add(a, b) { return a + b; }
Tokens:
[
  { type: 'Keyword', value: 'function', line: 1 },
  { type: 'Identifier', value: 'add', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Identifier', value: 'a', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Identifier', value: 'b', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Keyword', value: 'return', line: 1 },
  { type: 'Identifier', value: 'a', line: 1 },
  { type: 'Operator', value: '+', line: 1 },
  { type: 'Identifier', value: 'b', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 }
]

Input String 4:
1.23 + 4 * 5
Tokens:
[
  { type: 'FloatLiteral', value: 1.23, line: 1 },
  { type: 'Operator', value: '+', line: 1 },
  { type: 'IntegerLiteral', value: 4, line: 1 },
  { type: 'Operator', value: '*', line: 1 },
  { type: 'IntegerLiteral', value: 5, line: 1 }
]

Input String 5:
"This is a text literal"
Tokens:
[ { type: 'TextLiteral', value: '"This is a text literal"', line: 1 } ]

Input String 6:
invalid !@# characters
Tokens:
[
  { type: 'Identifier', value: 'invalid', line: 1 },
  { type: 'Operator', value: '!', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Identifier', value: 'characters', line: 1 }
]
File Tokens:
[
  { type: 'Keyword', value: 'let', line: 1 },
  { type: 'Identifier', value: 'x', line: 1 },
  { type: 'Operator', value: '=', line: 1 },
  { type: 'IntegerLiteral', value: 1, line: 1 },
  { type: 'Error', value: 'Unrecognized character', line: 1 },
  { type: 'Identifier', value: 'x', line: 2 },
  { type: 'Operator', value: '=', line: 2 },
  { type: 'IntegerLiteral', value: 2, line: 2 },
  { type: 'Error', value: 'Unrecognized character', line: 2 },
  { type: 'Identifier', value: 'data', line: 3 },
  { type: 'Operator', value: '=', line: 3 },
  { type: 'IntegerLiteral', value: 2, line: 3 },
  { type: 'Error', value: 'Unrecognized character', line: 3 }
]
 */

















































/*
Lab 4 (Compiler Design)
Topic: CONTEXT-FREE GRAMMARS

INTRODUCTION 
Grammars and parsing have a long history in linguistics. Computer science built on the accumulated knowledge when starting to design programming languages and compilers. There are, however, some important differences which can be attributed to two main factors. One is that programming languages are designed, while human languages evolve, so grammars serve as a means of specification (in the case of programming languages), while they serve as a means of description (in the case of human languages). The other is the difference in the use of grammars and parsing. In programming languages the meaning of a program should be unambiguously determined so it will execute in a predictable way. Clearly, this then also applies to the result of parsing a well-formed expression: it should be unique. In natural language we are condemned to live with its inherent ambiguities: in the sentence “Prachi spotted Vijay with binoculars,” it is possible that Prachi had the binoculars (using them to spot Vijay) or that Vijay had the binoculars (which were with him when he was spotted by Prachi). In this lecture we review an important class of grammars, called context-free grammars and the associated problem of parsing. Some context-free grammars are not suitable for the use in a compiler, mostly due to the problem of ambiguity, but also due to potential inefficiency of parsing. However, the tools we use to describe context-free grammars remain incredibly important in practice. We use BackusNaur form, a way of specifying context-free grammars, to specify our languages in technical communication: you’ve already seen this in programming assignments for this class. We also use the language of context-free grammars to describe grammars to computers. The input to parser generators such as Yacc or Happy is a context free grammar (and possibly some precedence rules), and the output is efficient parsing code written in your language of choice.


GRAMMARS 
Grammars are a general way to describe languages. You have already seen regular expressions, which also define languages but are less expressive. A language is a set of sentences and a sentence is a sequence drawn from a finite set Σ of terminal symbols. Grammars also use non-terminal symbols that are successively replaced using productions until we arrive at a sentence. Sequences that can contain nonterminal and terminal symbols are called strings. We denote strings by α, β, γ, . . .. non-terminals are generally denoted by X, Y, Z and terminals by a, b, c. Inside a compiler, terminal symbols are most likely lexical tokens, produced from a bare character string by lexical analysis that already groups substrings into tokens of appropriate type and skips over whitespace. 
A grammar is defined by set of productions α → β and a start symbol S, a distinguished non-terminal symbol. In the productions, α and β are strings and α contains at least one non-terminal symbol. 
For a given grammar G with start symbol S, a derivation in G is a sequence of rewritings S → γ1 → · · · → γn = w in which we apply productions from G. For instance, if α → β is a production then γi+1 might be the string that we get by replacing one occurrence of α in γi by β. We often simply write S →∗ w instead of S → γ1 → · · · → w. 
The language L(G) of G is the set of sentences that we can derive using the productions of G. 
Consider for example the following grammar. 
[1] S −→ aBSc 
[2] S −→ abc
[3] Ba −→ aB 
[4] Bb −→ bb 
To refer to the productions, we assign a label [`] to each rule. Following a common conversion, lower-case letters are terminal symbols and upper-case denote nonterminal symbols. The following is a derivation of the sentence a 3 b 3 c 3 . We annotate each step in the derivation with the label of the production that we applied.
 
S
−→1 aBSc
−→1 aBaBScc
−→3 aaBBScc
−→2 aaBBabccc
−→3 aaBaBbccc
−→3 aaaBBbccc
−→4 aaaBbbccc
−→4 aaabbbccc

Grammars are very expressive. In fact, we can describe all recursively enumerable languages with grammars. As a consequence, it is in general undecidable if w ∈ L(G) for a string w and a grammar G (the so-called word problem). Of course, we would like our compiler to be able to quickly decide whether a given input program matches the specification given by the grammar. So we will use a class of grammars for which we can decide if w ∈ L(G) more efficiently. The syntax of programming languages is usually give by a context-free grammar. Context-free grammars (and languages) are also called type-2 grammars following the classification in the Chomsky hierarchy. We have already seen type-3 languages in the lecture about lexing. Type-3 languages are regular languages. The Chomsky hierarchy is shown in Figure 1. In the table, you find the grammar class, the alternative name of the corresponding languages, the corresponding automata model that recognizes languages of the class, restrictions on the rules, and an example language. We say a language is of type-n if it can be described by a grammar of type-n. The example languages for type-n are not of type-(n−1). Note that every grammar (language) of type-n + 1 is of type-n. The table also describes the complexity of the word problem for the respective class of grammars, that is, given a grammar G and a word w ∈ Σ ∗ , decide if w ∈ L(G). Regular expressions are not expressive enough for programming languages since they cannot describe “matching parenthesis structures” such as {a n b n | n ≥ 1}. So we have to use at least context-free grammars (type 1). In general, deciding the word problem for type-1 grammars is cubic in the length of the word. However, we will use a specific context-free grammars that can be parsed more efficiently.
CONTEXT FREE GRAMMAR is a formal grammar which is used to generate all possible strings in a given formal language.
Context free grammar G can be defined by four tuples as:
1.	G= (V, T, P, S)  
Where,
G describes the grammar
T describes a finite set of terminal symbols.
V describes a finite set of non-terminal symbols
P describes a set of production rules
S is the start symbol.
In CFG, the start symbol is used to derive the string. You can derive the string by repeatedly replacing a non-terminal by the right hand side of the production, until all non-terminal have been replaced by terminal symbols.
Example:
L= {wcwR | w € (a, b)*}
Production rules:
1.	S → aSa  
2.	S → bSb  
3.	S → c  
Now check that abbcbba string can be derived from the given CFG.
1.	S ⇒ aSa  
2.	S ⇒ abSba  
3.	S ⇒ abbSbba  
4.	S ⇒ abbcbba  
By applying the production S → aSa, S → bSb recursively and finally applying the production S → c, we get the string abbcbba.

CAPABILITIES OF CFG
There are the various capabilities of CFG:
o	Context free grammar is useful to describe most of the programming languages.
o	If the grammar is properly designed then an efficientparser can be constructed automatically.
o	Using the features of associatively & precedence information, suitable grammars for expressions can be constructed.
o	Context free grammar is capable of describing nested structures like: balanced parentheses, matching begin-end, corresponding if-then-else's & so on.

DERIVATION
Derivation is a sequence of production rules. It is used to get the input string through these production rules. During parsing we have to take two decisions. These are as follows:
o	We have to decide the non-terminal which is to be replaced.
o	We have to decide the production rule by which the non-terminal will be replaced.
We have two options to decide which non-terminal to be replaced with production rule.

LEFT-MOST DERIVATION
In the left most derivation, the input is scanned and replaced with the production rule from left to right. So in left most derivatives we read the input string from left to right.
Example:
Production rules:
1.	S = S + S  
2.	S = S - S  
3.	S = a | b |c  
Input:
a - b + c
The left-most derivation is:
1.	S = S + S  
2.	S = S - S + S  
3.	S = a - S + S  
4.	S = a - b + S  
5.	S = a - b + c 

RIGHT-MOST DERIVATION
In the right most derivation, the input is scanned and replaced with the production rule from right to left. So in right most derivatives we read the input string from right to left.
Example:
1.	S = S + S  
2.	S = S - S  
3.	S = a | b |c  
Input:
a - b + c
The right-most derivation is:
1.	S = S - S  
2.	S = S - S + S  
3.	S = S - S + c  
4.	S = S - b + c  
5.	S = a - b + c  

PARSE TREE
o	Parse tree is the graphical representation of symbol. The symbol can be terminal or non-terminal.
o	In parsing, the string is derived using the start symbol. The root of the parse tree is that start symbol.
o	It is the graphical representation of symbol that can be terminals or non-terminals.
o	Parse tree follows the precedence of operators. The deepest sub-tree traversed first. So, the operator in the parent node has less precedence over the operator in the sub-tree.
The parse tree follows these points:
o	All leaf nodes have to be terminals.
o	All interior nodes have to be non-terminals.
o	In-order traversal gives original input string.

AMBIGUITY
A grammar is said to be ambiguous if there exists more than one leftmost derivation or more than one rightmost derivative or more than one parse tree for the given input string. If the grammar is not ambiguous then it is called unambiguous.  					 

If the grammar has ambiguity then it is not good for a compiler construction. No method can automatically detect and remove the ambiguity but you can remove ambiguity by re-writing the whole grammar without ambiguity.
PARSER
Parser is a compiler that is used to break the data into smaller elements coming from lexical analysis phase.
A parser takes input in the form of sequence of tokens and produces output in the form of parse tree.
Parsing is of two types: top down parsing and bottom up parsing.
 
TOP DOWN PARING
o	The top down parsing is known as recursive parsing or predictive parsing.
o	Bottom up parsing is used to construct a parse tree for an input string.
o	In the top down parsing, the parsing starts from the start symbol and transform it into the input symbol.
Parse Tree representation of input string "acdb" is as follows:
 
BOTTOM UP PARSING
o	Bottom up parsing is also known as shift-reduce parsing.
o	Bottom up parsing is used to construct a parse tree for an input string.
o	In the bottom up parsing, the parsing starts with the input symbol and construct the parse tree up to the start symbol by tracing out the rightmost derivations of string in reverse.
 
Bottom up parsing is classified in to various parsing. These are as follows:
1.	Shift-Reduce Parsing
2.	Operator Precedence Parsing
3.	Table Driven LR Parsing
a.	LR( 1 )
b.	SLR( 1 )
c.	CLR ( 1 )
d.	LALR( 1 )
SHIFT REDUCE PARSING
o	Shift reduce parsing is a process of reducing a string to the start symbol of a grammar.
o	Shift reduce parsing uses a stack to hold the grammar and an input tape to hold the string.
 
o	Sift reduce parsing performs the two actions: shift and reduce. That's why it is known as shift reduces parsing.
o	At the shift action, the current symbol in the input string is pushed to a stack.
o	At each reduction, the symbols will replaced by the non-terminals. The symbol is the right side of the production and non-terminal is the left side of the production.
Example:
Grammar:
1.	S → S+S    
2.	S → S-S    
3.	S → (S)  
4.	S → a  
Input string:
1.	a1-(a2+a3)  
 
Parsing table:
 
There are two main categories of shift reduce parsing as follows:
1.	Operator-Precedence Parsing
2.	LR-Parser


OPERATOR PRECEDENCE PARSING
Operator precedence grammar is kinds of shift reduce parsing method. It is applied to a small class of operator grammars.
A grammar is said to be operator precedence grammar if it has two properties:
o	No R.H.S. of any production has a∈.
o	No two non-terminals are adjacent.
Operator precedence can only established between the terminals of the grammar. It ignores the non-terminal.
There are the three operator precedence relations:
a ⋗ b means that terminal "a" has the higher precedence than terminal "b".
a ⋖ b means that terminal "a" has the lower precedence than terminal "b".
a ≐ b means that the terminal "a" and "b" both have same precedence.

 
PARSING ACTION
o	Both end of the given input string, add the $ symbol.
o	Now scan the input string from left right until the ⋗ is encountered.
o	Scan towards left over all the equal precedence until the first left most ⋖ is encountered.
o	Everything between left most ⋖ and right most ⋗ is a handle.
o	$ on $ means parsing is successful.

 
LR PARSER
LR parsing is one type of bottom up parsing. It is used to parse the large class of grammars.
In the LR parsing, "L" stands for left-to-right scanning of the input.
"R" stands for constructing a right most derivation in reverse.
"K" is the number of input symbols of the look ahead used to make number of parsing decision.
LR parsing is divided into four parts: LR (0) parsing, SLR parsing, CLR parsing and LALR parsing.
 
LR ALGORITHM:
The LR algorithm requires stack, input, output and parsing table. In all type of LR parsing, input, output and stack are same but parsing table is different.

Input buffer is used to indicate end of input and it contains the string to be parsed followed by a $ Symbol.
A stack is used to contain a sequence of grammar symbols with a $ at the bottom of the stack.
Parsing table is a two dimensional array. It contains two parts: Action part and Go To part.

LR (1) PARSING
Various steps involved in the LR (1) Parsing:
o	For the given input string write a context free grammar.
o	Check the ambiguity of the grammar.
o	Add Augment production in the given grammar.
o	Create Canonical collection of LR (0) items.
o	Draw a data flow diagram (DFA).
o	Construct a LR (1) parsing table.

AUGMENT GRAMMAR
Augmented grammar G` will be generated if we add one more production in the given grammar G. It helps the parser to identify when to stop the parsing and announce the acceptance of the input.
Example
Given grammar
1.	S → AA  
2.	A → aA | b  
The Augment grammar G` is represented by
1.	S`→ S  
2.	S → AA  
3.	A → aA | b  

Lab 5 (Compiler Design)

Topic: Lexical Analyzer

Phases of a Compiler:
A compiler is a software translator program that converts pure high-level language instructions into a machine-understandable format. Generally, we write programs in languages like Python, C, etc... Machines/computers aren't capable of understanding these languages. It can only understand binary language. Writing a program in the binary language is hard. Hence, we use compilers as a medium.
Compiling is the second step in a machine's language processing system. It expands the macros given by #define and then gives the pure high-level language code to the compiler. When we write a program in a high-level language, the preprocessor receives the code and performs a few operations like Macro-expansion and file inclusion. When preprocessor directives like #include and #define, the preprocessor includes the specified header files.
The compiler then translates the source program into assembly language (a combination of high-level and binary language). It transfers it to the assembler for further encoding into the lowest-level machine code.  

Compilation: 
The task of a compiler isn't just to translate but also to ensure that the given code is lexically, syntactically, and semantically correct. One of the compiler's major tasks is detecting and displaying error messages.
When we write a program and compile it, the compiler takes the whole program at a time, processes the whole code, and displays the list of all error messages and warnings at a time, unlike an interpreter. An interpreter is another translator similar to a compiler. It reads the program line-by-line, and once it finds an error, it stops execution and displays the error message.
It works phase-wise, dividing all the tasks it has to complete. Here are all the phases included in the compilation:
 
Phases: 
o	The first four phases in the flowchart represent the Analysis stage
o	The last two phases represent the Synthesis stage.
o	In the Analysis stage, the given code in the high-level language is analysed lexically, syntactically, and semantically and an intermediate code is generated. In contrast, in the Synthesis stage, assembly code generation takes place using the results of the analysis stage.
o	The Analysis stage of a compiler is machine-independent and language-dependent, while the synthesis stage is machine-dependent and language-independent.
o	Hence, if we want to build a new compiler, we need not build it from scratch; we can borrow another compiler's intermediate code generator and build it from there. This process is called "Retargeting".
o	The symbol table is the data structure a compiler uses to store and retrieve all the identifiers used in the program, along with necessary information categorized by data type and scope. Hence, a symbol table and error handler are used in every phase.
We'll discuss each phase of the compiler in detail. This tutorial explains the first phase-Lexical Analysis.
Lexical Analysis: 
A lexical analyzer is also called a "Scanner". Given the code's statement/ input string, it reads the statement from left to right character-wise. The input to a lexical analyzer is the pure high-level code from the preprocessor. It identifies valid lexemes from the program and returns tokens to the syntax analyzer, one after the other, corresponding to the getNextToken command from the syntax analyzer.

There are three important terms to grab:
1.	Tokens: A Token is a pre-defined sequence of characters that cannot be broken down further. It is like an abstract symbol that represents a unit. A token can have an optional attribute value. There are different types of tokens:
o	Identifiers (user-defined)
o	Delimiters/ punctuations (;, ,, {}, etc.)
o	Operators (+, -, *, /, etc.)
o	Special symbols
o	Keywords
o	Numbers

2.	Lexemes: A lexeme is a sequence of characters matched in the source program that matches the pattern of a token.
For example: (, ) are lexemes of type punctuation where punctuation is the token.
Token	Lexeme	Pattern
Keyword	while	w-h-i-l-e
Relop	<	<, >, >=, <=, !=, ==
Integer	7	(0 - 9)*-> Sequence of digits with at least one digit
String	"Hi"	Characters enclosed by " "
Punctuation	,	; , . ! etc.
Identifier	number	A - Z, a - z A sequence of characters and numbers initiated by a character.

3.	Patterns: A pattern is a set of rules a scanner follows to match a lexeme in the input program to identify a valid token. It is like the lexical analyzer's description of a token to validate a lexeme.
For example, the characters in the keyword are the pattern to identify a keyword. To identify an identifier the pre-defined set of rules to create an identifier is the pattern.
 
Everything that a lexical analyzer has to do: 
1.	Stripping out comments and white spaces from the program
2.	Read the input program and divide it into valid tokens
3.	Find lexical errors
4.	Return the Sequence of valid tokens to the syntax analyzer
5.	When it finds an identifier, it has to make an entry into the symbol table.

How Lexical Analyzer works:
1.	Input preprocessing: This stage involves cleaning up the input text and preparing it for lexical analysis. This may include removing comments, whitespace, and other non-essential characters from the input text.

2.	Tokenization: This is the process of breaking the input text into a sequence of tokens. This is usually done by matching the characters in the input text against a set of patterns or regular expressions that define the different types of tokens.

3.	Token classification: In this stage, the lexer determines the type of each token. For example, in a programming language, the lexer might classify keywords, identifiers, operators, and punctuation symbols as separate token types.

4.	Token validation: In this stage, the lexer checks that each token is valid according to the rules of the programming language. For example, it might check that a variable name is a valid identifier, or that an operator has the correct syntax.

5.	Output generation: In this final stage, the lexer generates the output of the lexical analysis process, which is typically a list of tokens. This list of tokens can then be passed to the next stage of compilation or interpretation.
 
The lexical analyzer identifies the error with the help of the automation machine and the grammar of the given language on which it is based like C, C++, and gives row number and column number of the error.
Suppose we pass a statement through lexical analyzer – a = b + c;               
It will generate token sequence like this: id=id+id;                 
Where each id refers to it’s variable in the symbol table referencing all details 

There are 5 valid tokens in this printf statement. 

Example-1: Count number of tokens:
int main ()
{
  	int a = 10, b = 20;
 	printf ("sum is:%d",a+b);
  	return 0;
}
Answer: Total number of token: 27.

Example-2: Count number of tokens: int max (int i);
•	Lexical analyzer first read int and finds it to be valid and accepts as token.
•	max is read by it and found to be a valid function name after reading ‘(‘.
•	int is also a token, then again, I as another token and finally ‘;’.
  
•	We can represent in the form of lexemes and tokens as under
Lexemes	Tokens	Lexemes	Tokens
 while	 WHILE	a	IDENTIEFIER
  (	LAPREN	=	ASSIGNMENT
   a	IDENTIFIER	a	IDENTIFIER
  >=	COMPARISON	–	ARITHMETIC
   b	IDENTIFIER	2	INTEGER
  )	RPAREN	;	SEMICOLON

Input Buffering: 
First, the lexical analyzer has to read the input program and break it into tokens. This is achieved by a method called "Input Buffering".
For suppose, assume that the line of code is:
1.	int i, j;  
2.	i = j + 1;  
3.	jj = j + 1;  
The input is stored in buffers to avoid going to secondary memory.
Initially, we used a One-buffer scheme:
 
Two pointers are used to read and find tokens: *bp (Beginning) and *fp (foreword). *bp is kept at the beginning, and *fp is traversed through the buffer. Once *fp finds a delimiter like white space or semi-colon, the traversed part between *bp and the encountered delimiter is identified as a token. Now, *bp and *fp are set to the succeeding block of the delimiter to continue searching for tokens.
 
The drawback of One-buffer schema: When the string we want to read is longer than the buffer length, before reading the whole string, the end of the buffer is reached, and the whole buffer has to be reloaded with the rest of the string, which makes identification hard
Hence, the Two Buffer scheme is introduced.
Here, two buffers of the same size are used. The advantage is that when the first buffer is filled, the second buffer is loaded, and vice versa. We won't lose strings midways.
 
Whenever fp* moves forward, eof checks if it is reaching the end to reload the second buffer. So, this is how an input program is read, and tokens are divided.
The next question is how the lexical analyzer can match patterns with lexemes to check the validity of lexemes with tokens.
 
Patterns: 
The Lexical analyzer has to scan and identify only a finite set of valid tokens/ lexemes from the program for which it uses patterns. Patterns are the to find a valid lexeme from the program. These patterns are specified using "Regular grammar". All the valid tokens are given pre-defined patterns to check the validity of detected lexemes in the program.

1. Numbers
A number can be in the form of:
1.	A whole number (0, 1, 2...)
2.	A decimal number (0.1, 0.2...)
3.	Scientific notation(1.25E), (1.25E23)

The grammar has to identify all types of numbers:
Sample Regular grammar:
1.	Digit -> 0|1|....9  
2.	Digits -> Digit (Digit)*  
3.	Number -> Digits (.Digits)? (E[+ -] ? Digits)?   
4.	Number -> Digit+ (.Digit)+? (E[+ -] ? Digit+)?   
o	? represents 0 or more occurrences of the previous expression
o	* represents 0 or more occurrences of the base expression
o	+ represents 1 or more occurrences of the base expression

2. Delimiters
There are different types of delimiters like white space, newline character, tab space, etc.
Sample Regular grammar:
1.	Delimiter -> ' ', '\t', '\n'  
2.	Delimiters -> delimiter (delimiter)*  
3. Identifiers

The rules of an identifier are:
1.	It has to start only with an alphabet.
2.	After the first alphabet, it can have any number of alphabets, digits, and underscores.
Sample Regular grammar:
1.	Letter -> a|b|....z  
2.	Letter -> A|B|...Z  
3.	Digit -> 0|1|...9  
4.	Identifier -> Letter (Letter/ Digit)*  
Now, we have detected lexemes and pre-defined patterns for every token. The lexical analyzer needs to recognize and check the validity of every lexeme using these patterns.
To recognize and verify the tokens, the lexical analyzer builds Finite Automata for every pattern. Transition diagrams can be built and converted into programs as an intermediate step. Each state in the transition diagram represents a piece of code. Every identified lexeme walks through the Automata. The programs built from Automata can consist of switch statements to keep track of the state of the lexeme. The lexeme is verified to be a valid token if it reaches the final state.
Here are some transition diagrams. These are just examples drawn manually, but the compiler's original rules and pattern programs are way more complicated as they have to recognize all types of lexemes whichever way they are used.

White spaces:
When a compiler recognizes a white space or other separating characters like '\t' and '\n', it doesn't send it to the syntax analyzer. It rather starts the whole lexical analysis process from the immediate next token. This is called Stripping the spaces from a program.

3. Keywords
Identifies if, else, and for. As mentioned earlier, a keyword's letters are the pattern to identify a keyword.
 
4. Relational Operators
GE: Greater than or equal to
LE: Less than or equal to
GT: Greater than
LT: Less than
EQ: Equals to
NE: Not equal to
 
Attributes for Tokens: 
In a program, many lexemes can correspond to one token. We learned that the lexical analyzer sends a sequence of tokens to the next phase. Still, the rest of the phases need additional information about the lexeme to perform different operations.
Both 0 and 1 are identified as Numbers. But, if we send that there is a Number in the program, it isn't sufficient for the Code generator. Hence, the tokens are sent as a pair of <Token name, Attribute value> to the Syntax analyzer.
In the case of complex tokens like Identifiers, The Attribute value is a pointer pointing to the identifier's entry in the symbol table to associate more information about the identifier.
Now, what exactly does the Lexical Analyzer send the Syntax Analyzer?
Let us take an example of grammar for a simple if-else branching statement:
1.	Stmt -> if expr then Stmt  
2.	              If expr then stmt else Stmt  
3.	              ε  
4.	expr -> term relop term  
5.	              term  
6.	term -> id  
7.	              number  
Here is the output of the lexical analyzer to the next phase for this snippet:
LEXEMES	TOKEN NAME	ATTRIBUTE VALUE
Any white space	-	-
if	if	-
then	then	-
else	else	-
Any Identifier	id	Pointer to symbol table entry of id
Any number	number	Pointer to symbol table entry of id
<	relop	LT
>	relop	GT
>=	relop	GE
<=	relop	LE
==	relop	EQ
<>	relop	NE
A lexeme is like an instance of a token, and the attribute column is used to show which lexeme of the token is used. For every lexeme, the 1st and 2nd columns of the above table are sent to the Syntax Analyzer.
 
Lexical Errors: 
Finding Lexical Errors is one of the tasks of the Lexical Analyzer. But, it is hard for the Lexical Analyzer to determine if a lexeme is faulty without any other components. Suppose it finds:
fi (a, b)...
For the lexeme fi, the Lexical analyzer can't figure out whether it is a misspelling of if or an undeclared function call identifier. 'fi' makes a valid identifier. Hence, the lexical analyzer doesn't raise any error and validates it as an identifier. Somewhere in the upcoming phases, the error will be identified.
For suppose a lexeme isn't matched with any token pattern, the Lexical analyzer enters "Panic mode" and performs some error-recovery actions to repair the input:
1.	Deletes all the successive characters until a valid lexeme is found
2.	Deletes one character from the remaining input
3.	Replaces a character with another character
4.	Transposes/ exchanges two characters
5.	Inserts a missing character into the lexeme to match a token pattern.
Generally, lexical errors occur due to one character. Hence, these transformations serve adequately. The Lexical analyzer attempts to find a valid lexeme in fewer such transformations.

Advantages: 
Efficiency: Lexical analysis improves the efficiency of the parsing process because it breaks down the input into smaller, more manageable chunks. This allows the parser to focus on the structure of the code, rather than the individual characters.
Flexibility: Lexical analysis allows for the use of keywords and reserved words in programming languages. This makes it easier to create new programming languages and to modify existing ones.
Error Detection: The lexical analyzer can detect errors such as misspelled words, missing semicolons, and undefined variables. This can save a lot of time in the debugging process.
Code Optimization: Lexical analysis can help optimize code by identifying common patterns and replacing them with more efficient code. This can improve the performance of the program.
 
Disadvantages: 
Complexity: Lexical analysis can be complex and require a lot of computational power. This can make it difficult to implement in some programming languages.
Limited Error Detection: While lexical analysis can detect certain types of errors, it cannot detect all errors. For example, it may not be able to detect logic errors or type errors.
Increased Code Size: The addition of keywords and reserved words can increase the size of the code, making it more difficult to read and understand.
Reduced Flexibility: The use of keywords and reserved words can also reduce the flexibility of a programming language. It may not be possible to use certain words or phrases in a way that is intuitive to the programmer.

This document covered the basic concepts of "Lexical Analysis". After all the processing, the output of a lexical analyzer to the syntax analyzer is a sequence of tokens with attributes. 

*/