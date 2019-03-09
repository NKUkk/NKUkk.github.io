---
layout: post
title: 剑指offer—二维数组查找
date: 2019-03-09 
tag: Java 
---   

<br>

 
 
### 题目

  在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。


### 分析         

**先判断数组是否为空！！！**

从第一行开始，判断给出的整数是否大于这一行的第一个数并且小于这一行的最后一个数，如果是，就遍历这一行，否则，判断下一行。

### 代码   
```
public class Solution {
    public boolean Find(int target, int [][] array) {
        if(array==null||array.length==0||(array.length==1&&array[0].length==0))
            return false;
        else{
            for(int i=0;i<array.length;i++){
                if(array[i][0]<=target&&array[i][array[i].length-1]>=target){
                    for(int j=0;j<array[i].length;j++){
                        if(target==array[i][j])
                            return true;
                    }
                }
                else
                    continue;
            }
        }
        return false;
    }
}
```



### 知识点
##### 判断数组是否为空
①一维数组
```
public int primeNumberCount(int[] array){
        //首地址为空或者长度为空
    	if(array==null||array.length==0)		
    		return 0;
}
```
②二维数组
```
if(array==null||array.length==0||(array.length==1&&array[0].length==0))
```
Java中判断二维数组是否为空，要判断三种情况：

1、二维数组首地址是否为空，即array==null；

2、二维数组是否为{}，即array.length==0的情况；

3、二维数组是否为{{}}，即array.length=1&&array[0].length==0的情况；


<br>  
<br>  
转载请注明原地址:[KK's Blog](http://www.inankai.top)

