# chatGPTAutoAnswerByNode.js
A chatGPT API encapsulated by Node.js+Express

**Thanks to this project for bringing the API**  [chatanywhere/GPT_API_free](https://github.com/chatanywhere/GPT_API_free) 

This is a simple project. Its purpose is to encapsulate the chatgpt API through Node.js+Express to achieve the desired effect.

HOW TO USE
---

Configure the system environment of Node.js
The version of Node.js is **18.18.0 LTS**

1.  Git this project to the computer
```
git clone https://github.com/reconvene/chatGPTAutoAnswerByNode.js.git
```

2.  Don't forget this step

    Replace **‘!!!-----yourAPIKey-----!!!’** with your **APIKey**
   
    *Do not delete the preceding ‘Bearer’*
```
const config={
	// 设置请求的头部，包含内容类型和授权密钥
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer !!!-----yourAPIKey-----!!!'
	},
	//设置超时时间
	timeout: 5000
};
```

3. Go to the directory and npm install
```
npm install
```

4. Start the app.js
```
node app.js
```
# Finished
Access http://**yourServerIP**:3000/api/qa?question=**yourquestion** through the **GET** method to obtain JSON data
