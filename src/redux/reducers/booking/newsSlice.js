import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dienAnh24h: {
        tinChinh: [
            {
                tieuDe: 'Kate Winslet Chia Sẻ Về Việc Bị Body Shaming Và Kỉ Lục Khi Diễn Avatar 2',
                noiDung: 'Nếu có thể quay ngược thời gian, tôi sẽ xử sự khác hẳn.” – Nữ diễn viên nhấn mạnh: “Tôi sẽ bảo rằng: Sao các người dám nói thế!’” Trước lần tái hợp ở Avatar: The Way Of Water, Kate Winslet và nhà làm phim vĩ đại James Cameron từng làm việc cùng nhau trong một siêu bom tấn khác – Titanic (1997)',
                link: 'https://www.galaxycine.vn/movie-blog/kate-winslet-chia-se-ve-viec-bi-body-shaming-va-ki-luc-khi-dien-avatar-2',
                hinhAnh: 'https://www.galaxycine.vn/media/2022/12/28/kate-winslet-chia-se-ve-viec-bi-body-shaming-va-ki-luc-khi-dien-avatar-2-4_1672214845291.jpg'
            },
            {
                tieuDe: 'James Cameron Và Giấc Mơ Điện Ảnh Tỷ Đô',
                noiDung: 'Sau 13 năm chờ đợi, người hâm mộ của tựa phim Avatar đã có thể mãn nguyện, khi phần phim mới – Avatar: The Way Of Water được công chiếu và nhận về nhiều phản hồi tích cực.',
                link: 'https://www.galaxycine.vn/movie-blog/james-cameron-va-giac-mo-dien-anh-ty-do',
                hinhAnh: 'https://www.galaxycine.vn/media/2022/12/20/1135-1_1671543463065.jpg'
            },
            {
                tieuDe: 'Avatar Và Những Tựa Phim Bắt Khán Giả Đợi Dài Cổ',
                noiDung: 'Từ bất kỳ ý tưởng bất chợt nào đấy, phải chuyển hóa chúng thành những trang kịch bản hoàn chỉnh. Tiếp đến là tuyển diễn viên, các công đoạn tiền kỳ phải được chuẩn bị đầy đủ. Khi tiến hành quay, bởi có nhiều yếu tố tác động nên thời gian ngắn hay dài là điều không nói trước được.',
                link: 'https://www.galaxycine.vn/movie-blog/avatar-va-nhung-tua-phim-bat-khan-gia-doi-dai-co',
                hinhAnh: 'https://www.galaxycine.vn/media/2022/11/30/1135-1_1669779575874.jpg',
            },
            {
                tieuDe: 'Bóc Trứng Phục Sinh Black Panther: Wakanda Forever',
                noiDung: 'Cùng tìm hiểu những chi tiết ẩn thú vị của Black Panther: Wakanda Forever!',
                link: 'https://www.galaxycine.vn/movie-blog/boc-trung-phuc-sinh-black-panther-wakanda-forever',
                hinhAnh: 'https://www.galaxycine.vn/media/2022/11/17/boc-trung-phuc-sinh-black-panther-wakanda-forever-3_1668663793725.jpg'
            },
        ],
        tinPhu: [
            {
                noiDung: 'Bà Đinh Thị Thanh Hương Nhận Giải Nhà Phát Hành Của CineAsia Năm 2022',
                link: 'https://www.galaxycine.vn/movie-blog/ba-dinh-thi-thanh-huong-nhan-giai-nha-phat-hanh-cua-cineasia-nam-2022',
                hinhAnh: 'https://www.galaxycine.vn/media/2022/12/16/madame-huong-3_1671168995199.jpg'
            },
            {
                noiDung: 'Máy Ngừng Quay, Họ Vẫn Diễn – Những Ngôi Sao Tận Tâm Nhất!',
                link: 'https://www.galaxycine.vn/movie-blog/may-ngung-quay-ho-van-dien--nhung-ngoi-sao-tan-tam-nhat',
                hinhAnh: 'https://cdn.galaxycine.vn/media/2022/8/29/may-ngung-quay--ho-van-dien--nhung-ngoi-sao-tan-tam-nhat-9_1661792149954.jpg'
            },
            {
                noiDung: 'Ly Lấp Lánh Mừng Avatar Trở Lại',
                link: 'https://www.galaxycine.vn/khuyen-mai/ly-lap-lanh-mung-avatar-tro-lai',
                hinhAnh: 'https://www.galaxycine.vn/media/2022/11/29/combo-avatar2-digital-1135x660_1669694390048.jpg'
            },
            {
                noiDung: 'Black Panther Wakanda Forever: Bóc Tách Trailer Mới Nhất!',
                link: 'https://www.galaxycine.vn/binh-luan-phim/review-the-black-phone-day-kinh-di-va-du-giai-tri',
                hinhAnh: 'https://cdn.galaxycine.vn/media/2022/10/5/black-panther-wakanda-forever-boc-tach-trailer-moi-nhat-14_1664954208526.jpg'
            },
        ]
    },

    review: {
        tinChinh: [
            {
                tieuDe: '[Review] Avatar The Way Of Water Đây Chính Là “Điện Ảnh”?',
                noiDung: 'Avatar: The Way Of Water vừa công chiếu vào 15.12. Tạm bỏ qua mối hoài nghi rằng phần phim mới có kiếm đủ 2 tỷ $ để hòa vốn và tiếp tục sản xuất các phần 4-5-6 hay sẽ kết thúc ở phần 3, hãy cùng tìm hiểu xem Dòng Chảy Của Nước liệu có xuất sắc hơn siêu phẩm Avatar 13 năm trước?',
                link: 'https://www.galaxycine.vn/binh-luan-phim/review-avatar-the-way-of-water-day-chinh-la-dien-anh',
                hinhAnh: 'https://cdn.galaxycine.vn/media/2022/12/18/avatar-the-way-of-water-day-chinh-la-dien-anh-6_1671336520375.jpg'
            },
            {
                tieuDe: '[Review] Black Panther Wakanda Forever: Báo Đen Tìm Được Người Kế Vị Xứng Đáng?',
                noiDung: 'Mất đi ngôi sao quan trọng nhất, Marvel gặp rất nhiều khó khăn khi thực hiện Black Panther: Wakanda Forever – phần tiếp theo phim đình đám về siêu anh hùng Báo Đen.',
                link: 'https://www.galaxycine.vn/binh-luan-phim/review-black-panther-wakanda-forever-bao-den-tim-duoc-nguoi-ke-vi-xung-dang',
                hinhAnh: 'https://cdn.galaxycine.vn/media/2022/11/11/black-panther-wakanda-forever-bao-den-tim-duoc-nguoi-ke-vi-xung-dang-2_1668181423298.jpg'
            },
            {
                tieuDe: '[Review] Black Adam: Cứu Tinh Cho Vũ Trụ DC Mở Rộng?',
                noiDung: '15 năm kể từ ngày được chọn diễn Black Adam, Dwayne Johnson và các nhà làm phim WB rốt cuộc đã thành công đưa gã mặc đồ đen lên màn ảnh rộng.',
                link: 'https://www.galaxycine.vn/binh-luan-phim/review-black-adam-cuu-tinh-cho-vu-tru-dc-mo-rong',
                hinhAnh: 'https://cdn.galaxycine.vn/media/2022/10/27/black-adam-cuu-tinh-cho-vu-tru-dc-mo-rong--5_1666852856433.jpg',
            },
            {
                tieuDe: '[Review] Bỗng Dưng Trúng Số: Cứ 5 Phút Là Bắt Cười, Không Để Ai Nghỉ Mệt',
                noiDung: 'Câu chuyện của Nam Hàn và Bắc Hàn luôn là đề tài nóng hổi được nền điện ảnh Hàn quốc khai thác rất nhiều trong thời gian gần đây, thành công nhất phải kể đến phim tình cảm lãng mạn Hạ Cánh Nơi Anh làm mưa làm gió trên các trang mạng xã hội. Cũng trên tinh thần đó, năm nay, các nhà làm phim Hàn Quốc đã mang đến cho khán giả Bỗng Dưng Trúng Số',
                link: 'https://www.galaxycine.vn/binh-luan-phim/review-bong-dung-trung-so-cu-5-phut-la-bat-cuoi-khong-de-ai-nghi-met',
                hinhAnh: 'https://www.galaxycine.vn/media/2022/9/27/oantuxi-jpg-281663772407_1664263208472.jpg'
            },
        ],
        tinPhu: [
            {
                noiDung: '[Review] Alienoid Cuộc Chiến Xuyên Không: Bom Tấn Vượt Qua Mọi Giới Hạn Tưởng Tượng!',
                link: 'https://www.galaxycine.vn/movie-blog/ba-dinh-thi-thanh-huong-nhan-giai-nha-phat-hanh-cua-cineasia-nam-2022',
                hinhAnh: 'https://www.galaxycine.vn/media/2022/12/16/madame-huong-3_1671168995199.jpg'
            },
            {
                noiDung: '[Preview] Black Panther Wakanda Forever: T’Challa Hi Sinh Trong Trận Chiến Với Atlantis?',
                link: 'https://www.galaxycine.vn/binh-luan-phim/preview-black-panther-wakanda-forever-tchalla-hi-sinh-trong-tran-chien-voi-atlantis',
                hinhAnh: 'https://cdn.galaxycine.vn/media/2022/7/31/preview-black-panther-wakanda-forever-tchalla-hi-sinh-trong-tran-chien-voi-atlantis-2_1659228681681.jpg'
            },
            {
                noiDung: '[Review] Thor Love And Thunder: Nâng Tầm Natalie Portman Và Tiếp Tục Để Chris Hemsworth Tấu Hài?',
                link: 'https://www.galaxycine.vn/binh-luan-phim/review-thor-love-and-thunder-nang-tam-natalie-portman-va-tiep-tuc-de-chris-hemsworth-tau-hai',
                hinhAnh: 'https://cdn.galaxycine.vn/media/2022/7/9/thor-love-and-thunder-nang-tam-natalie-portman-va-tiep-tuc-de-chris-hemsworth-tau-hai-3_1657381136830.jpg'
            },
            {
                noiDung: '[Review] The Black Phone: Đầy Kinh Dị Và Đủ Giải Trí',
                link: 'https://www.galaxycine.vn/binh-luan-phim/review-the-black-phone-day-kinh-di-va-du-giai-tri',
                hinhAnh: 'https://cdn.galaxycine.vn/media/2022/6/29/450_1656510349274.jpg'
            },
        ]
    }

    
}

const newsSlice = createSlice({
    name: 'newsSlice',
    initialState,
    reducers: {}
});

export default newsSlice.reducer