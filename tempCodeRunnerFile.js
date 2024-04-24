#include <stdio.h>
   2   │ 
   3   │ int main() {
   4   │   // declare 3 variables
   5   │   int num1, num2, sum;
   6   │   
   7   │   printf("Enter two numbers: "); // say user to add input
   8   │   scanf("%d %d", &num1, &num2); // read input from user
   9   │ 
  10   │   sum = num1 + num2; // add two numbers
  11   │   printf("Sum: %d\n", sum); // print the sum
  12   │ 
  13   │   return 0;
  14   │ }