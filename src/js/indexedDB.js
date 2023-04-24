const IDB = window.indexedDB;
const cart = 'CartDB';

// DB 생성
// 오브젝트 스토어 생성
if (!IDB) window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
else {
    let db;
    const request = IDB.open(cart, 3);

    request.onupgradeneeded = (e) => { 
        db = e.target.result;
        db.createObjectStore('Book', { keyPath: 'id', autoIncrement: true }); 
        request.onerror = (e) => alert('failed');
        request.onsuccess = (e) => db = request.result; 
    }
}

// 데이터 추가
function addIDB(books) {
    const request = IDB.open(cart);

    request.onerror = (e) => {
      alert('DataBase error', e.target.errorCode);
    }
    request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction(['Book'], 'readwrite');  
    
        transaction.oncomplete = (e) => {
            console.log('success');
        }
        transaction.onerror = (e) => {
            console.log('fail');
        }
        
        const objStore = transaction.objectStore('Book');
        for (const book of books) {
            const request = objStore.add(book);   
            request.onsuccess = (e) => console.log(e.target.result);
        };
    };
};

// 데이터 조회
function getIDB(key) {
    return new Promise((resolve, reject) => {

        const request = IDB.open(cart);
        
        request.onerror = (e) => {
            console.log(e.target.errorCode);
        }
        request.onsuccess = (e) => {
            const db = request.result;
            const transaction = db.transaction('Book');
            
            transaction.onerror = (e) => {
                console.log('fail');
            }
            transaction.oncomplete = (e) => {
                console.log('success');
            }
            
            const objStore = transaction.objectStore('Book');
            const objStoreRequest = objStore.get(key);
            objStoreRequest.onsuccess = (e) => {
                console.log(objStoreRequest.result);
                resolve(objStoreRequest.result);
            };
        };
    });
};