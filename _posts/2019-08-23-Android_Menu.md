---
layout: post
title: Android基础知识（三）——二维码扫描
date: 2019-08-23 
tag: Android 
---   

<br>

#### Android实现右上角三点弹出菜单。

### 在res文件夹下创建menu文件夹，并在其下创建menu.xml文件

![](/images/posts/Android_Menu/menu1.jpg)

#### menu.xml文件的内容如下：

```
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item android:id="@+id/menu_scan" android:title="扫一扫"></item>
    <item android:id="@+id/menu_setting" android:title="设置"></item>

</menu>
```

### 需要实现弹出菜单的界面UserActivity.java的代码如下：

```
package com.example.myapplication;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

//标题栏不可以隐藏！！！！！！
public class UserActivity extends AppCompatActivity {
    private ListView list1;
    private ListView list2;

    private void setListViewHeightBasedOnChildren(ListView listView) {
        // 获取ListView对应的Adapter
        ListAdapter listAdapter = listView.getAdapter();
        if (listAdapter == null) {
            return;
        }

        int totalHeight = 0;
        for (int i = 0, len = listAdapter.getCount(); i < len; i++) {
            // listAdapter.getCount()返回数据项的数目
            View listItem = listAdapter.getView(i, null, listView);
            // 计算子项View 的宽高
            listItem.measure(0, 0);
            // 统计所有子项的总高度
            totalHeight += listItem.getMeasuredHeight();
        }

        ViewGroup.LayoutParams params = listView.getLayoutParams();
        params.height = totalHeight+ (listView.getDividerHeight() * (listAdapter.getCount() - 1));
        // listView.getDividerHeight()获取子项间分隔符占用的高度
        // params.height最后得到整个ListView完整显示需要的高度
        listView.setLayoutParams(params);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);
        //连接数据库
        MySqliteHelper helper=new MySqliteHelper(UserActivity.this);
        SQLiteDatabase db=helper.getReadableDatabase();
        //为listview传入显示的值
        list1 = (ListView) findViewById(R.id.info);
        final List<String> listdata1 = new ArrayList<>();
        listdata1.add("学号");
        //查询所有学号信息，存入到Cursor
        Cursor cursor1=db.rawQuery("select id from userinfo",null);
        //将Cursor中的信息添加到链表中
        for(int i=0;i<cursor1.getCount();i++){
            //遍历Cursor中的信息，必须要移动Cursor的光标位置，另一种方法是使用while(cursor1.moveToNext())
            cursor1.moveToPosition(i);
            listdata1.add(cursor1.getString(0));
        }

        list2 = (ListView) findViewById(R.id.mesg);
        final List<String> listdata2 = new ArrayList<>();
        listdata2.add("姓名");
        Cursor cursor2=db.rawQuery("select name from userinfo",null);
        for(int i=0;i<cursor2.getCount();i++){
            cursor2.moveToPosition(i);
            listdata2.add(cursor2.getString(0));
        }
        cursor1.close();
        cursor2.close();
        db.close();
        helper.close();
        //借助listview适配器将链表容器中的值显示在listview上
        final ListViewAdapter listViewAdapter1 = new ListViewAdapter(listdata1, this);
        list1.setAdapter(listViewAdapter1);
        setListViewHeightBasedOnChildren(list1);
        final ListViewAdapter listViewAdapter2 = new ListViewAdapter(listdata2, this);
        list2.setAdapter(listViewAdapter2);
        setListViewHeightBasedOnChildren(list2);

        //listview中item的点击监听事件
        list1.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                //获得当前点击的item的文本内容
                String str1=listViewAdapter1.getItem(i).toString();
                //跳转页面
                Intent intent=new Intent(UserActivity.this,DetailActivity.class);
                //将点击位置的id信息传递到下一个页面
                intent.putExtra("id",str1);
                Log.e("传值id",str1);
                startActivity(intent);
            }
        });

        list2.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                String str2=listViewAdapter2.getItem(i).toString();
                Intent intent=new Intent(UserActivity.this,DetailActivity.class);
                intent.putExtra("name",str2);
                Log.e("传值name",str2);
                startActivity(intent);
            }
        });

        //添加按钮的监听事件
        final Button button=(Button) findViewById(R.id.add);
        button.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                switch (motionEvent.getAction()){
                    case MotionEvent.ACTION_DOWN:
                        button.setBackgroundColor(Color.parseColor("#ff0000"));
                        Intent intent=new Intent(UserActivity.this,AddActivity.class);
                        startActivity(intent);
                        break;
                    case MotionEvent.ACTION_UP:
                        button.setBackgroundColor(Color.parseColor("#8a2be2"));
                        break;
                }
                return true;
            }
        });

    }

    //实现右上角弹出菜单！
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu,menu);
        return true;
    }

    //实现弹出菜单的点击事件
    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()){
            case R.id.menu_scan:
                Intent intent=new Intent(UserActivity.this,QRcodeActivity.class);
                startActivity(intent);
                break;
            case R.id.menu_setting:
                Toast.makeText(UserActivity.this,"敬请期待！",Toast.LENGTH_SHORT).show();
                break;
        }
        return true;
    }
}


```  

### 此时点击右上角的三个点会弹出菜单，但菜单会遮住标题栏及三个点  

![](/images/posts/Android_Menu/menu2.jpg)

### 修改styles.xml  

```
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        //menu不遮挡标题栏
        <item name="overlapAnchor">false</item>
    </style>

</resources>

```
![](/images/posts/Android_Menu/menu2.jpg)



<p> </p>  


转载请注明原地址:[KK's Blog](http://www.inankai.top)
