---
layout: post
title: Android基础知识（三）——二维码扫描
date: 2019-08-23 
tag: Android 
---   

<br>

#### Android实现扫描二维码功能。


### 添加依赖  

#### 修改build.gradle(Project:XXXX)，在allprojects中添加maven { url 'https://jitpack.io' }，否则会提示添加依赖失败
```
allprojects {
    repositories {
        google()
        jcenter()
        maven { url 'https://jitpack.io' }
    }
}

```  
#### 修改build.gradle(Module:app)，在dependencies中添加依赖

```
implementation 'com.github.yuzhiqiang1993:zxing:2.2.8'

```  

### 在UserActivity.java中实现点击按钮跳转到二维码处理界面  

```
final Button button1=findViewById(R.id.saoyisao);
button1.setOnTouchListener(new View.OnTouchListener() {
    @Override
    public boolean onTouch(View view, MotionEvent motionEvent) {
        switch(motionEvent.getAction()){
            case MotionEvent.ACTION_DOWN:
                button1.setBackgroundColor(Color.parseColor("#ff0000"));
                Intent intent=new Intent(UserActivity.this,QRcodeActivity.class);
                startActivity(intent);
                break;
            case MotionEvent.ACTION_UP:
                button1.setBackgroundColor(Color.parseColor("#8a2be2"));
                break;
        }
        return true;
    }
});
```

### 在二维码处理界面QRcodeActivity.java代码如下：

```
package com.example.myapplication;


import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.widget.TextView;


import com.yzq.zxinglibrary.android.CaptureActivity;
import com.yzq.zxinglibrary.common.Constant;


public class QRcodeActivity extends Activity {

    private TextView result;
    private int REQUEST_CODE_SCAN=111;

    //实现扫描
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_qrcode);
        Intent intent=new Intent(QRcodeActivity.this, CaptureActivity.class);
        startActivityForResult(intent,REQUEST_CODE_SCAN);
    }

    //接收二维码内部包含的信息
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        result=findViewById(R.id.res);
        // 扫描二维码/条码回传
        if (requestCode == 111&&resultCode==RESULT_OK) {
            if (data != null) {
                String content = data.getStringExtra(Constant.CODED_CONTENT);
                String[] strings=content.split(" ");
                MySqliteHelper helper=new MySqliteHelper(QRcodeActivity.this);
                SQLiteDatabase db=helper.getReadableDatabase();
                Cursor cursor=db.rawQuery("select * from userinfo where id=?",new String[]{strings[0]});
                //result.setText("扫描结果为：" + content);
                if(cursor.getCount()!=0){
                    result.setText("员工编号："+strings[0]+"，姓名："+strings[1]+"已打卡！");
                }
                else{
                    result.setText("二维码无效！");
                }
            }
        }
    }

}

```



<p> </p>  

参考自[https://github.com/yuzhiqiang1993/zxing](https://github.com/yuzhiqiang1993/zxing) 

转载请注明原地址:[KK's Blog](http://www.inankai.top)
