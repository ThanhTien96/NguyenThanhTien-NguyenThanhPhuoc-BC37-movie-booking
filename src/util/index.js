
// cat chuỗi nhập vào text và độ dài trả ra 1 chuỗi với định dạn mới
export const truncateText = (text, ele) => {
    if(text.length > ele){
        return text.substr(0, ele) + '...';
    }else{
        return text;
    }
}