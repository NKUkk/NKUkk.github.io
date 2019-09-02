---
layout: post
title: 算法笔记（一）——回溯算法
date: 2019-09-02 
tag: C++ 
---   

<br>

回溯算法（back tracking）是常用算法之一，是一种选优搜索法，又称试探法，按选优条件向前搜索，已达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。  
通俗地讲，回溯法可以理解为通过选择不同的岔路口寻找目的地，一个岔路口一个岔路口的去尝试找到目的地。如果走错了路，继续返回来找到岔路口的另一条路，直到找到目的地。
 
 
### 实例

八皇后问题：八皇后问题是一个古老而著名的问题，是回溯算法的典型例题。该问题是十九世纪著名的数学家高斯1850年提出：在8X8格的国际象棋上摆放八个皇后（棋子），使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上。

### 分析         

每行每列只能放一个棋子，从第一行开始放，然后放第二行，第三行……如果能放到第八行，则解法数加一，否则前一行的棋子在还有能换位置的情况下换位置（改变所在列），没有可换位置时，再向前回退一行，如此反复。  

### 主要函数  

```
bool is_OK(int row,int col);   //判断当前位置能否放下棋子
void print();                  //输出函数，画出所有情况下的棋盘
void findQueen(int row);       //寻找皇后位置，row从0开始
```

### 代码   
```
#include<iostream>
using namespace std;
const int N = 8;
int array[N][N];
int num = 0;
bool is_ok(int row,int col){
	for (int i = 0; i < row; i++){
		if (1 == array[i][col] )
			return false;
		if (1 == array[i][i - row + col] && i - row + col >= 0)
			return false;
		if (1 == array[i][row + col - i] && row + col - i < N)
			return false;
	}
	return true;
}
void print(){
	for (int i = 0; i < N; i++){
		for (int j = 0; j < N; j++)
			cout << array[i][j] << " ";
		cout << endl;
	}
	cout << endl;
}
void findQueen(int row){
	if (row == N){
		num++;
		print();
		return;
	}
	for (int col = 0; col < N; col++){
		if (is_ok(row, col)){
			array[row][col] = 1;
			findQueen(row + 1);
			array[row][col] = 0;
		}
	}
}
void main(){
	for (int i = 0; i < N; i++){
		for (int j = 0; j < N; j++)
			array[i][j] = 0;
	}
	findQueen(0);
	cout << "共有" << num << "种解法" << endl << endl;
}
```


<p> </p>

参考博客：[小白带你学--回溯算法](https://www.jianshu.com/p/dd3c3f3e84c0)
转载请注明原地址:[KK's Blog](http://www.inankai.top)
