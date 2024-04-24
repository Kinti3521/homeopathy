/*
* Q)Write a C program to check whether a given string is a valid for loop statement or not.
*/

#include <stdio.h> 
#include <stdlib.h> 
#include <string.h> 

//array to copy first three characters of string str 
char arr[3]; 

void isCorrect(char *str) 
{ 
	
	//semicolon, bracket1, bracket2 are used 
		//to count frequencies of 
	//';', '(', and ')' respectively 
	//flag is set to 1 when an error is found, else no error 
	int semicolon = 0, bracket1 = 0, bracket2 = 0, flag = 0; 
	
	int i; 
	for (i = 0; i < 3; i++) 
		arr[i] = str[i]; 
		
	//first 3 characters of the for loop statement is copied 
	if(strcmp(arr, "for") != 0) 
	{ 
		printf("Invalid"); 
		return; 
	} 
	
	//Proper usage of "for" keyword checked 
	while(i != strlen(str)) 
	{ 
		char ch = str[i++]; 
		if(ch == '(') 
		{ 
			//opening parenthesis count 
			bracket1 ++; 
		} 
		else if(ch == ')') 
		{ 
			//closing parenthesis count 
			bracket2 ++; 
			
		} 
		else if(ch == ';') 
		{ 
			//semicolon count 
			semicolon ++; 
		} 
		else continue; 
		
	} 
	
	//check number of semicolons 
	if(semicolon != 2) 
	{ 
		printf("\nInvalid"); 
		flag++; 
	} 
	
	//check closing Parenthesis 
	else if(str[strlen(str) - 1] != ')') 
	{ 
		printf("\nInvalid"); 
		flag++; 
	} 
	
	//check opening parenthesis 
	else if(str[3] == ' ' && str[4] != '(' ) 
	{ 
		printf("\nInvalid"); 
		flag++; 
	} 
	
	//check parentheses count 
	else if(bracket1 != 1 || bracket2 != 1 || bracket1 != bracket2) 
	{ 
		printf("\nInValid"); 
		flag++; 
	} 
	
	//no error 
	if(flag == 0) 
		printf("\nValid"); 
			
} 

int main(void) { 
	
	char str1[100] = "for (i = 10; i < 20; i++)"; 
	isCorrect(str1); // Valid
	
	char str2[100] = "for i = 10; i < 20; i++)"; 
	isCorrect(str2); // Invalid
	
	return 0; 
} 


/* Output:
* Valid
* InValid
*/


















































/*
Lab 6 (Compiler Design)
Topic: Syntax Analysis

•	Syntax Analysis
The parser (syntax analyzer) receives the source code in the form of tokens from the lexical analyzer and performs syntax analysis, which create a tree-like intermediate representation that depicts the grammatical structure of the token stream. Syntax analysis is also called parsing.
A typical representation is a abstract syntax tree in which each interior node represents an operation the children of the node represent the arguments of the operation.
•	Position of Syntax Analyzer

 
•	Role of Parser:
	Checks the stream of words and their parts of speech (produced by the scanner) for grammatical correctness.
	Determines if the input is syntactically well formed.
	Guides checking at deeper levels than syntax (static semantics checking).
	Builds an IR representation of the code.

•	Study of Parsing
	Parser
The parser:
i.	Needs the syntax of programming language constructs, which can be
ii.	specified by context-free grammars or BNF (Backus-Naur Form)
iii.	Need an algorithm for testing membership in the language of the grammar.

	Roadmap
The roadmap for study of parsing
1.	Context-free grammars and derivations
2.	Top-down parsing
a.	Recursive descent (predictive parsing)
b.	LL (Left-to-right, Leftmost derivation) methods
3.	Bottom-up parsing
a.	Operator precedence parsing
b.	LR (Left-to-right, Rightmost derivation) methods
c.	SLR, Canonical LR (CLR), LALR

•	Expressive Power of Different Parsing Techniques
 

•	Benefits Offered by Grammar

o	Grammars offer significant benefits for both language designers and compiler writers:
	A grammar gives a precise, yet easy-to-understand syntactic specification to a programming language.
	Parsers can automatically be constructed for certain classes of grammars.
•	The parser-construction process can reveal syntactic ambiguities and trouble spots.
	A grammar imparts structure to a language.
•	The structure is useful for translating source programs into correct object code and for detecting errors.
	A grammar allows a language to be evolved.
•	New constructs can be integrated more easily into an implementation that follows the grammatical structure of the language.
•	Why Not Use RE/DFA?
Advantages of RE/DFA:
1.	Simple & powerful notation for specifying patterns
2.	Automatic construction of fast recognizers
3.	Many kinds of syntax can be specified with REs

•	Limits of RE/DFA:
Finite automata cannot count, which means a finite automaton cannot accept a language like {anb"|n > 1} that would require it to keep count of the number of a's before it sees the b's. Therefore, RE cannot check the balance of parenthesis, brackets, begin-end Pairs.
•	CFG vs RE:
Grammars are a more powerful notation than regular expressions.
Every construct that can be described by a regular expression can be described by a grammar, but not vice-versa. Every regular language is a context-free language, but
not vice-versa.

•	Context-Free Grammar:
	Definition
A context-free grammar (CFG) has four components:
1.	A set of terminal symbols, sometimes referred to as "tokens."
2.	A set of nonterminal symbols. sometimes called "syntactic variables."
3.	One nonterminal is distinguished as the start symbol.
4.	A set of productions in the form: LHS -> RHS where
a.	LHS (called head, or left side) is a single nonterminal symbol
b.	RHS (called body, or right side) consists of zero or more terminals and non-terminals.
5.	The terminals are the elementary symbols of the language defined by the grammar.
6.	Non-terminals impose a hierarchical structure on the language that is key to syntax analysis and translation.
7.	Conventionally, the productions for the start symbol are listed first.
8.	The productions specify the manner in which the terminals and non-terminals can be combined to form strings.

•	Introduction to Parsing

•	Syntax analysis is often referred to as parsing.

•	Responsibilities of a syntax analyzer, or parser:

	Determine whether the input program is syntactically correct.

	Produce a parse tree. In some cases, the parse tree is only implicitly constructed.

	When an error is found, a parser must produce a diagnostic message and recovery. Recovery is required so that the compiler finds as many errors as possible.

•	Parsers are categorized according to the direction in which they build parse trees:

	Top-down parsers build the tree from the root downward to the leaves.

	Bottom-up parsers build the tree from the leaves upward to the root.

•	Notational conventions for grammar symbols and strings:

•	Terminal symbols—Lowercase letters at the beginning of the alphabet (a, b, …)

•	Nonterminal symbols—Uppercase letters at the beginning of the alphabet (A, B,…)

•	Terminals or nonterminals—Uppercase letters at the end of the alphabet (W, X, Y, Z)

•	Strings of terminals—Lowercase letters at the end of the alphabet (w, x, y, z) Mixed strings (terminals and/or nonterminals)—Lowercase Greek letters (α, β,γ, δ).
 
Top-Down Parsers

•	A top-down parser traces or builds the parse tree in preorder: each node is visited before its branches are followed.

•	The actions taken by a top-down parser correspond to a leftmost derivation.

•	Given a sentential form xAα that is part of a leftmost derivation, a top-down parser’s task is to find the next sentential form in that leftmost derivation.

Determining the next sentential form is a matter of choosing the correct gram-mar rule that has A as its left-hand side (LHS).

If the A-rules are A → bB, A → cBb, and A → a, the next sentential form could be xbBα, xcBbα, or xaα.

The most commonly used top-down parsing algorithms choose an A-rule based on the token that would be the first generated by A.

•	The most common top-down parsing algorithms are closely related.

A recursive-descent parser is coded directly from the BNF description of the syntax of a language.
An alternative is to use a parsing table rather than code.


•	Both are LL algorithms, and both are equally powerful. The first L in LL specifies a left-to-right scan of the input; the second L specifies that a leftmost derivation is generated.

Bottom-Up Parsers

•	A bottom-up parser constructs a parse tree by beginning at the leaves and pro-gressing toward the root. This parse order corresponds to the reverse of a right-most derivation.

•	Given a right sentential form α, a bottom-up parser must determine what sub-string of α is the right-hand side (RHS) of the rule that must be reduced to its LHS to produce the previous right sentential form.

•	A given right sentential form may include more than one RHS from the gram-mar. The correct RHS to reduce is called the handle.

•	Consider the following grammar and derivation:

S → aAc A → a|b
S => aAc => aaAc => aabc

A bottom-up parser can easily find the first handle, b, because it is the only RHS in the sentence aabc. After replacing b by the corresponding LHS, A, the parser is left with the sentential form aaAc. Finding the next handle will be more difficult because both aAc and aA are potential handles.

•	A bottom-up parser finds the handle of a given right sentential form by examining the symbols on one or both sides of a possible handle.

•	The most common bottom-up parsing algorithms are in the LR family. The L specifies a left-to-right scan and the R specifies that a rightmost derivation is generated.
 
The Complexity of Parsing

•	Parsing algorithms that work for any grammar are inefficient. The worst-case complexity of common parsing algorithms is O(n3), making them impractical for use in compilers.

•	Faster algorithms work for only a subset of all possible grammars. These algo-rithms are acceptable as long as they can parse grammars that describe program-ming languages.

•	Parsing algorithms used in commercial compilers have complexity O(n).


The Recursive-Descent Parsing Process

•	A recursive-descent parser consists of a collection of subprograms, many of which are recursive; it produces a parse tree in top-down order.

•	A recursive-descent parser has one subprogram for each nonterminal in the grammar.

•	EBNF is ideally suited for recursive-descent parsers.

•	An EBNF description of simple arithmetic expressions:

<expr> → <term> {(+ | -) <term>} <term> → <factor> {(* | /) <factor>} <factor> → id | int_constant | ( <expr> )


•	These rules can be used to construct a recursive-descent function named expr that parses arithmetic expressions.


•	The lexical analyzer is assumed to be a function named lex. It reads a lexeme and puts its token code in the global variable nextToken. Token codes are defined as named constants.

•	Writing a recursive-descent subprogram for a rule with a single RHS is rela-tively simple.

For each terminal symbol in the RHS, that terminal symbol is compared with nextToken. If they do not match, it is a syntax error. If they match, the lex-ical analyzer is called to get to the next input token.
For each nonterminal, the parsing subprogram for that nonterminal is called.

•	Each recursive-descent subprogram, including expr, leaves the next input token in nextToken.

•	expr does not include any code for syntax error detection or recovery, because there are no detectable errors associated with the rule for <expr>.

The LL Grammar Class

•	Recursive-descent and other LL parsers can be used only with grammars that meet certain restrictions.

•	Left recursion causes a catastrophic problem for LL parsers.

•	Calling the recursive-descent parsing subprogram for the following rule would cause infinite recursion:

A→A+B

•	The left recursion in the rule A → A + B is called direct left recursion, because it occurs in one rule.

•	An algorithm for eliminating direct left recursion from a grammar: For each nonterminal A,
1.	Group the A-rules as A → Aα1 | Aα2 | … | Aαm | β1 | β2 | … | βn where none of the β’s begins with A.

2.	Replace the original A-rules with:
				A → β1A′ | β2A′ | … | βnA′

A′ → α1A′ | α2A′ | … | αmA′ | ε

•	The symbol ε represents the empty string. A rule that has ε as its RHS is called an erasure rule, because using it in a derivation effectively erases its LHS from the sentential form.

The LL Grammar Class (Continued)

•	Left recursion can easily be eliminated from the following grammar:

E→E+T|T T→T*F|F F → ( E ) | id

For the E-rules, we have α1 = + T and β1 = T, so we replace the E-rules with

E→TE′
E′→+TE′|ε

For the T-rules, we have α1 = * F and β1 = F, so we replace the T-rules with

T→FT′
T′→*FT′|ε

The F-rules remain the same.

•	The grammar with left recursion removed:

E→TE′
E′→+TE′|ε T→FT′

T′→*FT′|ε F → ( E ) | id

•	Indirect left recursion poses the same problem as direct left recursion:

A → B a A 
B → A b

The LL Grammar Class (Continued)

•	Left recursion is not the only grammar trait that disallows top-down parsing. A top-down parser must always be able to choose the correct RHS on the basis of the next token of input.


•	The pairwise disjointness test is used to test a non-left-recursive grammar to determine whether it can be parsed in a top-down fashion. This test requires computing FIRST sets, where

FIRST(α) = {a | α =>* aβ}

The symbol =>* indicates a derivation of zero or more steps. If α =>* ε, then ε is also in FIRST(α), where ε is the empty string.


•	There are algorithms to compute FIRST for any mixed string. In simple cases, FIRST can usually be computed by inspecting the grammar.


•	The pairwise disjointness test:

For each nonterminal A that has more than one RHS, and for each pair of rules, A → αi and A → αj, it must be true that FIRST(αi) ∩ FIRST(αj) = ∅.

•	An example:

A → a B | b A b | B b 
B → c B | d

The FIRST sets for the RHSs of the A-rules are {a}, {b}, and {c, d}. These rules pass the pairwise disjointness test.

•	A second example:

A → a B | B A b 
B → a B | b

The FIRST sets for the RHSs of the A-rules are {a} and {a, b}. These rules fail the pairwise disjointness test.

•	In many cases, a grammar that fails the pairwise disjointness test can be modi-fied so that it will pass the test.


•	The following rules do not pass the pairwise disjointness test: <variable> → identifier | identifier [ <expression> ]

(The square brackets are terminals, not metasymbols.) This problem can solved by left factoring.


•	Using left factoring, these rules would be replaced by the following rules:

<variable> → identifier <new> <new> → ε | [ <expression> ]


•	Using EBNF can also help. The original rules for <variable> can be replaced by the following EBNF rules:

<variable> → identifier [ [ <expression> ] ]

The outer brackets are meta symbols, and the inner brackets are terminals.


•	Formal algorithms for left factoring exist.


•	Left factoring cannot solve all pairwise disjointness problems. In some cases, rules must be rewritten in other ways to eliminate the problem.

The Parsing Problem for Bottom-Up Parsers

•	The following grammar for arithmetic expressions will be used to illustrate bot-tom-up parsing:

E→E+T|T T→T*F|F F → ( E ) | id

This grammar is left recursive, which is acceptable to bottom-up parsers.


•	Grammars for bottom-up parsers are normally written using ordinary BNF, not EBNF.


•	A rightmost derivation using this grammar:

E=>E+T =>E+T*F => E + T * id => E + F * id => E + id * id => T + id * id => F + id * id => id + id * id

The underlined part of each sentential form shows the RHS of the rule that was applied at that step.


•	A bottom-up parser produces the reverse of a rightmost derivation by starting with the last sentential form (the input sentence) and working back to the start symbol.


•	At each step, the parser’s task is to find the RHS in the current sentential form that must be rewritten to get the previous sentential form.

•	A right sentential form may include more than one RHS.

The right sentential form E + T * id includes three RHSs, E + T, T, and id.


•	The task of a bottom-up parser is to find the unique handle of a given right sen-tential form.


•	Definition: β is the handle of the right sentential form γ = αβw if and only if S =>*rm αAw =>rm αβw.

=>rm specifies a rightmost derivation step, and =>*rm specifies zero or more rightmost derivation steps.


•	Two other concepts are related to the idea of the handle.

•	Definition: β is a phrase of the right sentential form γ = α1βα2 if and only if S =>* α1Aα2 =>+ α1βα2.
=>+ means one or more derivation steps.

•	Definition: β is a simple phrase of the right sentential form γ = α1βα2 if and only if S =>* α1Aα2 => α1βα2.

The Parsing Problem for Bottom-Up Parsers (Continued)

•	A phrase is a string consisting of all of the leaves of the partial parse tree that is rooted at one particular internal node of the whole parse tree.


•	A simple phrase is a phrase that is derived from a nonterminal in a single step.

The leaves of the parse tree represent the sentential form E + T * id. Because there are three internal nodes, there are three phrases: E + T * id, T * id, and id.


•	The simple phrases are a subset of the phrases. In this example, the only simple phrase is id.


•	The handle of a right sentential form is the leftmost simple phrase.


•	Once the handle has been found, it can be pruned from the parse tree and the process repeated. Continuing to the root of the parse tree, the entire rightmost derivation can be constructed

Shift-Reduce Algorithms

•	Bottom-up parsers are often called shift-reduce algorithms, because shift and reduce are their two fundamental actions.

The shift action moves the next input token onto the parser’s stack.
A reduce action replaces a RHS (the handle) on top of the parser’s stack by its corresponding LHS. 
LR Parsers

•	Most bottom-up parsing algorithms belong to the LR family. LR parsers use a relatively small amount of code and a parsing table.


•	The original LR algorithm was designed by Donald Knuth, who published it in 1965. His canonical LR algorithm was not widely used because producing the parsing table required large amounts of computer time and memory.


•	Later variations on the table construction process were more popular. These variations require much less time and memory to produce the parsing table but work for smaller classes of grammars.


•	Advantages of LR parsers:

They can be built for all programming languages.
They can detect syntax errors as soon as possible in a left-to-right scan.
The LR class of grammars is a proper superset of the class parsable by LL parsers.

•	It is difficult to produce an LR parsing table by hand. However, there are many programs available that take a grammar as input and produce the parsing table.

•	Older parsing algorithms would find the handle by looking both to the left and to the right of the substring that was suspected of being the handle.

•	Knuth’s insight was that it was only necessary to look to the left of the suspected handle (by examining the stack) to determine whether it was the handle.

•	Even better, the parser can avoid examining the entire stack if it keeps a sum-mary of the stack contents in a “state” symbol on top of the stack.

•	In general, each grammar symbol on the stack will be followed by a state symbol (often written as a subscripted uppercase S).

•	The structure of an LR parser:

 
•	The contents of the parse stack for an LR parser has the following form, where the Ss are state symbols and the Xs are grammar symbols: S0X1S1X2S2…XmSm (top)

•	An LR parser configuration is a pair of strings representing the stack and the remaining input:

(S0XlSlX2S2…XmSm, aiai+1…an$)

The dollar sign is an end-of-input marker.


•	The LR parsing process is based on the parsing table, which has two parts, ACTION and GOTO.


•	The ACTION part has state symbols as its row labels and terminal symbols as its column labels.


•	The parse table specifies what the parser should do, based on the state symbol on top of the parse stack and the next input symbol.


•	The two primary actions are shift (shift the next input symbol onto the stack) and reduce (replace the handle on top of the stack by the LHS of the matching rule).


•	Two other actions are possible: accept (parsing is complete) and error (a syntax error has been detected).


•	The values in the GOTO part of the table indicate which state symbol should be pushed onto the parse stack after a reduction has been completed.

The row is determined by the state symbol on top of the parse stack after the handle and its associated state symbols have been removed.
The column is determined by the LHS of the rule used in the reduction.

•	Initial configuration of an LR parser: (S0, a1…an$)

•	Informal definition of parser actions:

Shift: The next input symbol is pushed onto the stack, along with the state sym-bol specified in the ACTION table.

Reduce: First, the handle is removed from the stack. For every grammar symbol on the stack there is a state symbol, so the number of symbols removed is twice the number of symbols in the handle. Next, the LHS of the rule is pushed onto the stack. Finally, the GOTO table is used to determine which state must be pushed onto the stack.

Accept: The parse is complete and no errors were found.

Error: The parser calls an error-handling routine.

•	All LR parsers use this parsing algorithm, although they may construct the pars-ing table in different ways.

•	The following grammar will be used to illustrate LR parsing:

1.	E→E+T
2.	E → T
3.	T→T*F

4.	T → F
5.	F→(E)
6.	F → id

•	The LR parsing table for this grammar:

R4 means reduce using rule 4; S6 means shift the next input symbol onto the stack and push state S6. Empty positions in the ACTION table indicate syntax errors.
 

•	A trace of the parse of id + id * id using the LR parsing algorithm:
 

Stack	Input
0	id + id * id $
0id5	+ id * id $
0F3	+ id * id $
0T2	+ id * id $
0E1	+ id * id $
0E1+6	id * id$
0E1+6id5	* id $
0E1+6F3	* id $
0E1+6T9	* id $
0E1+6T9*7	id $
0E1+6T9*7id5	$
0E1+6T9*7F10	$
0E1+6T9	$
0E1	$

Action
Shift 5
Reduce 6 (use GOTO[0, F])
Reduce 4 (use GOTO[0, T])
Reduce 2 (use GOTO[0, E])
Shift 6
Shift 5
Reduce 6 (use GOTO[6, F])
Reduce 4 (use GOTO[6, T])
Shift 7
Shift 5
Reduce 6 (use GOTO[7, F])
Reduce 3 (use GOTO[6, T])
Reduce 1 (use GOTO[0, E])
Accept
 
*/