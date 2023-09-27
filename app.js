// 引入express模块
const express = require('express');

// 创建一个express应用
const app = express();

// 引入request模块
const request=require('request');

// 设置请求的URL，这是ChatGPT API的地址
const url = 'https://api.chatanywhere.com.cn/v1/chat/completions';

// 设置请求的头部，包含内容类型和授权密钥
const headers = {
	'Content-Type': 'application/json',  
	'Authorization': 'Bearer yourAPIKey'
};

// 设置请求的数据，包含模型名称，消息列表，随机系数等
let data = {
	"model": "gpt-3.5-turbo",
	"messages": [{
		"role": "user", 
		"content": ""
	}],  
	"temperature": 0.7
};

//获取GPT的回答
function getGPTAnswer(question){
	console.log(question);
	data.messages[0].content=question;
	return new Promise((reslove,reject) => {
		let req=request({
			 url: url,
			 method: 'POST',
			 json: true,
			 headers: headers,
			 body: data
		} , (err,gptResponse,body) => {
			  if(err){
				  //console.error(err);
				  reject(err);
				  req.abort();
			  };
			  reslove(body);
			  req.abort();
		});
	});
};

app.get('/api/qa', async (req, res) => {	
  res.header('Access-Control-Allow-Origin', '*');
  // 设置响应头，允许的请求方法
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // 设置响应头，允许的请求头
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  // 获取请求中的question参数，这是客户端发来的问题
  const query = req.query.question;
  // 如果没有提供问题，则返回错误信息
  if (!query) {
    res.status(400).json({ error: 'No query provided' });
    return;
  }
  //向api获取答案，如果报错则抛出
  try{
	  GPTAnswer= await getGPTAnswer(query);
	  console.log(GPTAnswer.choices);
	  res.status(200).json({ GPTstatus: 200, title: query, answer: GPTAnswer.choices[0].message.content });
  }catch(err){
	  res.status(400).json({ GPTstatus: 400, title: query, answer: undefined});
	  console.log(err);
  };
});
// 设置一个监听端口号
const port = process.env.PORT || 3000;
// 启动服务器并监听端口号
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
