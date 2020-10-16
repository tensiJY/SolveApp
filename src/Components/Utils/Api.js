var myApp = myApp || {}; 
myApp.namespace = function(ns_string) { 
	var parts = ns_string.split('.'), parent = myApp, i; 
	if (parts[0] === "myApp") { 
		parts = parts.slice(1); 
	} 
	for (i = 0; i < parts.length; i += 1) { 
		if (typeof parent[parts[i]] === "undefined") { 
			parent[parts[i]] = {}; 
		} 
		parent = parent[parts[i]]; 
	} 
	return parent; 
} 
myApp.namespace('myApp.modules.api'); 
myApp.modules.api = function() { 
    
    //const _url = 'http://192.168.0.20:8080/kr';
    const _url = 'http://192.168.100.111:8080/kr'
    
    const _asyncApiCall = async( url)=>{
        let _res;
        let _data;

        try{
            _res = await fetch(url);
            _data = await _res.json();
            console.log('url : ', _data);
        }catch(e){
            console.log('api call error');
            console.log(_url);
            console.log(_data);
            console.log(e);
            _data = {};
            _data.result_code = 0;
            _data.is_error = true;
            _data.error_msg = '서버 전송 실패에 실패하였습니다';
        }

        return _data;
    }

    /**
     * "a=1&b=2"
     * @param {*} data 
     */
    const _getQueryStr = ( data )=>{
        let _arr = Object.keys(data);
        let _str = null;
        for(let i=0; i<_arr.length; i++){
            if(i==0){
                _str = _arr[i] + '=' +data[_arr[i]]
            }else{
                _str += '&'+ _arr[i] + '=' +data[_arr[i]]
            }
            
        }

        return _str;
    }//


    // 특권 메서드가 들어있는 객체를 반환 
    /**
     * 문제를 등록하는 함수
     * @param {*} _data 
     */
    const _regInsert = async( _data ) => {
        let _u = _url+'/reg/insert?'
        let _str = _getQueryStr(_data);

        const _res = await _asyncApiCall(_u + _str)

        return _res;
    }
    
    
	
	
	return { 
        //asyncApiCall : _asyncApiCall    //  동기
        regInsert : _regInsert
	}; 
}();

export default myApp.modules.api;
// const test = async () => {
//     try{
//         const response = await fetch('http://192.168.0.20:8080/kr/test/getAll');
//         const data = await response.json();
//         console.log(data)


//     }catch(error){
//         console.log('RandomUserData error');
//         console.log(error);
//     }
// }


// const _apiCall = ( url, obj)=>{
//     let _res = null;
    

//     fetch('http://192.168.0.20:8080/kr/test/getAll')
//     .then( response => response.json())
//     .then( (response) => {
//         console.log('1, ', response)
//          _res = response
//     })
//     .catch((error)=>{
//         console.log(error)
//     })

 
 
// }