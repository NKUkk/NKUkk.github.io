---
layout: post
title: VC++读取文件内容并逐行输出
date: 2018-08-03 
tag: C++ 
---   

<br>

  学了三年了，一些很基础的东西都丢掉了，希望能快点重新掌握。
　这也算不上是什么教程，只是我自己给自己出的一道题，后来又变化了一下，本质上还是相同的。
 
 
### 题目

   编写C++程序，使其能够读取“1.txt”文件中的内容，并逐行输出。


### 分析         

主要是文件流，调用fstream头文件。


### 代码   
```
#include<iostream>
#include<string>
#include<fstream>
using namespace std;
void main(){
	ifstream in("1.txt");
	string filename;
	string line;
	if (in){
		while (getline(in, line))
			cout << line << endl;
	}
	else<br>
		cout << "no such file."<<endl;
}
```

### 原文件内容
![](/images/posts/VC_File_Read/txt.jpg)

### 输出结果　
![](/images/posts/VC_File_Read/result1.jpg)

### 变形题1

不规定读取文件的名称，可以选择性的读取文件


### 代码
```
#include<iostream>
#include<string>
#include<fstream>
#include<windows.h>
using namespace std;
int main(){
	string filename;
	char line[100];
	ifstream fp;
	cin >> filename;
	fp.open(filename);
	if (fp){
		while (fp.getline(line, 10000)){
			cout << line << endl;
			Sleep(1000);
		}
	}
	else
		cout << "no such file." << endl;
	return 0;
} 
```

### 输出结果
![](/images/posts/VC_File_Read/result2.jpg)

### 变形题2
读取1.txt的内容写入2.txt

还没写。。。。

应该还能出几个变形题，比如：不定读取确定写入，确定读取不定写入，不定读取写入……
<p> </p>

转载请注明原地址:[KK's Blog](http://www.xiaobaozi.xyz)
