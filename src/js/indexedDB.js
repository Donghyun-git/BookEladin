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
