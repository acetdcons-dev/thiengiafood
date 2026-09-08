document.addEventListener('DOMContentLoaded', () => {
  const expansions = {
    'tinh-so-ban': `
      <h2>1. Phân loại khách trước khi chốt số bàn</h2>
      <p>Danh sách mời nên được chia thành ba nhóm: chắc chắn tham dự, đang chờ xác nhận và ít khả năng tham dự. Cách này thực tế hơn việc lấy toàn bộ số thiệp đã gửi để tính bàn. Với khách đi theo gia đình, cần hỏi rõ có trẻ nhỏ hay người đi cùng để tránh thiếu chỗ vào sát giờ.</p>
      <p>Khoảng ba đến năm ngày trước tiệc, hãy rà soát lại từng nhóm và cập nhật con số gần đúng nhất. Nếu tổ chức tiệc cưới hoặc tiệc công ty, nên có một người phụ trách duy nhất tổng hợp danh sách để tránh đếm trùng.</p>
      <h2>2. Chọn sức chứa bàn phù hợp</h2>
      <p>Bàn 10 người là lựa chọn phổ biến, nhưng không phải nhóm khách nào cũng nên xếp đủ 10 ghế. Người lớn tuổi, gia đình có trẻ nhỏ hoặc khách cần không gian trò chuyện thoải mái có thể bố trí 8–9 người một bàn. Mặt bằng hẹp nên được đo trước để xác định khoảng cách giữa các bàn và lối phục vụ.</p>
      <h2>3. Khi nào cần bàn dự phòng?</h2>
      <p>Tiệc dưới 10 bàn thường chỉ cần dự trù vài ghế hoặc một bàn chưa bày món. Tiệc đông khách có thể chuẩn bị thêm khoảng 5–10% sức chứa. Quan trọng nhất là thống nhất với đơn vị phục vụ điều kiện mở bàn, thời gian báo phát sinh và chi phí tương ứng.</p>
      <ul><li>Không bày sẵn món nóng lên bàn dự phòng.</li><li>Đặt bàn dự phòng ở vị trí dễ bổ sung nhưng không cản lối đi.</li><li>Chuẩn bị đủ chén, ly và ghế trước khi khách đến.</li><li>Chốt người có quyền quyết định mở thêm bàn.</li></ul>
      <h2>4. Ví dụ tính nhanh</h2>
      <p>Nếu dự kiến 76 khách, phương án an toàn là chuẩn bị 8 bàn chính và một phương án dự phòng. Không nhất thiết phải đặt đủ món cho 9 bàn ngay từ đầu; hãy trao đổi cách giữ nguyên liệu hoặc bổ sung bàn nếu số khách thực tế vượt dự kiến.</p>
      <div class="article__cta"><strong>Cần tính số bàn theo mặt bằng thực tế?</strong><a href="index.html#dat-tiec">Gửi số khách để Thiên Gia Food tư vấn</a></div>`,
    'menu-6-mon': `
      <h2>1. Vai trò của từng nhóm món</h2>
      <p>Khai vị giúp khách bắt đầu nhẹ nhàng, món chính tạo điểm nhấn, món rau hoặc món hấp cân bằng vị, còn lẩu hay món no giúp bữa tiệc trọn vẹn. Tráng miệng nên thanh nhẹ để kết thúc dễ chịu. Sáu món không có nghĩa là phải thật chọn sáu món thật đắt; điều quan trọng là nhịp món hợp lý và khẩu phần vừa đủ.</p>
      <h2>2. Công thức phối món dễ áp dụng</h2>
      <ol><li>Một món khai vị hoặc súp.</li><li>Một món gà, bò hoặc heo.</li><li>Một món cá hoặc hải sản.</li><li>Một món hấp, rau hoặc món có vị thanh.</li><li>Một món lẩu, cơm hay mì.</li><li>Một món tráng miệng.</li></ol>
      <p>Nếu khai vị đã có nhiều thành phần chiên, các món sau nên ưu tiên hấp, nấu hoặc xào. Nếu món chính có sốt đậm, lẩu nên chọn vị chua thanh thay vì tiếp tục dùng nước dùng béo.</p>
      <h2>3. Điều chỉnh theo nhóm khách</h2>
      <p>Tiệc gia đình nhiều thế hệ nên giảm món quá cay, quá cứng hoặc khó chia. Tiệc bạn bè trẻ có thể tăng món nướng, hải sản và lẩu. Tiệc công ty nên ưu tiên món dễ dùng, trình bày gọn và hạn chế nguyên liệu cần bóc tách nhiều.</p>
      <h2>4. Những lỗi thường gặp</h2>
      <ul><li>Ba món liên tiếp đều chiên hoặc nướng.</li><li>Quá nhiều thịt nhưng thiếu rau và món thanh.</li><li>Khai vị quá no khiến khách không dùng hết món sau.</li><li>Không hỏi trước về dị ứng, món kiêng hoặc nhu cầu ăn chay.</li></ul>
      <p>Trước khi chốt menu, hãy đọc toàn bộ danh sách theo thứ tự ra món. Nếu hai món liên tiếp có màu sắc, nguyên liệu hoặc cách chế biến tương tự, nên đổi một món để bàn tiệc phong phú hơn.</p>
      <div class="article__cta"><strong>Muốn chọn menu phù hợp ngân sách?</strong><a href="thuc-don-dai-tiec.html">Xem 38 thực đơn gợi ý</a></div>`,
    'kiem-tra-truoc-tiec': `
      <h2>1. Lối giao hàng và khu vực tập kết</h2>
      <p>Xe giao thực phẩm, bàn ghế và dụng cụ cần có điểm dừng phù hợp. Hãy báo trước nếu nhà nằm trong hẻm nhỏ, chung cư, khu vực cấm xe hoặc phải vận chuyển qua cầu thang. Một khu vực tập kết riêng giúp quá trình đưa đồ vào không ảnh hưởng khách và hàng xóm.</p>
      <h2>2. Mặt bằng đặt bàn</h2>
      <p>Không chỉ đo số mét vuông, gia đình cần tính cả cột nhà, cây, bậc thềm và lối mở cửa. Sau khi đặt bàn vẫn phải chừa lối cho khách di chuyển và nhân viên phục vụ. Trẻ nhỏ không nên ngồi sát khu bếp, lối mang món hoặc khu vực có dây điện.</p>
      <h2>3. Điện, nước và khu sơ chế</h2>
      <p>Kiểm tra ổ cắm, công suất điện, nguồn nước sạch và vị trí thoát nước. Nếu cần hâm nóng, chiếu sáng hoặc dùng quạt công suất lớn, không nên cắm tất cả vào một ổ nối. Khu sơ chế cần bề mặt sạch, đủ sáng và tách khỏi nơi để rác.</p>
      <h2>4. Phương án thời tiết</h2>
      <p>Tiệc ngoài sân cần có mái che hoặc phương án chuyển bàn khi mưa. Ngoài mưa, cần cân nhắc nắng chiều, gió mạnh và hướng khói từ khu nấu. Không nên chờ đến ngày tổ chức mới quyết định vị trí dự phòng.</p>
      <h2>5. Mốc thời gian trong ngày tiệc</h2>
      <ul><li>Giờ giao bàn ghế và dụng cụ.</li><li>Giờ bắt đầu sơ chế, nấu và bày bàn.</li><li>Giờ đón khách và giờ khai tiệc.</li><li>Thời điểm ra từng nhóm món.</li><li>Giờ thu dọn dự kiến.</li></ul>
      <p>Một lịch trình rõ ràng giúp gia đình biết lúc nào cần mở cổng, dọn mặt bằng và cử người kiểm tra hạng mục bàn giao.</p>
      <div class="article__cta"><strong>Cần khảo sát cách bố trí?</strong><a href="index.html#dat-tiec">Gửi thông tin không gian tổ chức</a></div>`,
    'chon-ban-ghe': `
      <h2>1. Bàn tròn, bàn dài hay bàn buffet?</h2>
      <p>Bàn tròn tạo cảm giác gần gũi và phù hợp cách phục vụ món chung. Bàn dài thích hợp không gian chữ nhật, tiệc thân mật hoặc phong cách hiện đại. Bàn buffet dùng để bày món, vì vậy cần đặt nơi khách dễ tiếp cận nhưng không chắn cửa ra vào.</p>
      <h2>2. Chọn ghế theo tính chất buổi tiệc</h2>
      <p>Ghế phổ thông phù hợp tiệc gia đình và giúp tối ưu chi phí. Ghế phủ áo nơ mang lại cảm giác trang trọng cho cưới hỏi, mừng thọ hoặc lễ kỷ niệm. Dù chọn mẫu nào, ghế cần sạch, chắc chắn và có chiều cao phù hợp với bàn.</p>
      <h2>3. Màu sắc và khăn bàn</h2>
      <p>Không cần dùng quá nhiều màu. Một màu nền trung tính kết hợp một màu nhấn thường dễ nhìn hơn. Tiệc cưới có thể dùng kem, trắng và đỏ rượu; tiệc gia đình phù hợp các tông ấm; tiệc công ty nên dựa vào màu nhận diện của đơn vị tổ chức.</p>
      <h2>4. Dụng cụ đi kèm cần xác nhận</h2>
      <ul><li>Chén, đĩa, đũa, muỗng và ly theo số khách.</li><li>Khăn bàn, áo ghế, nơ ghế và vật dụng trang trí.</li><li>Bàn phụ cho nước uống, quà tặng hoặc tiếp tân.</li><li>Dụng cụ dự phòng cho khách phát sinh.</li><li>Thời gian giao, lắp đặt và thu hồi.</li></ul>
      <h2>5. Kiểm tra khi nhận bàn ghế</h2>
      <p>Người phụ trách nên kiểm đếm số lượng, độ sạch và cách bố trí ngay sau khi setup. Nếu có thay đổi, xử lý trước giờ đón khách sẽ thuận lợi hơn rất nhiều so với khi chương trình đã bắt đầu.</p>
      <div class="article__cta"><strong>Đang cần thuê riêng bàn ghế?</strong><a href="index.html#ban-ghe">Xem dịch vụ bàn ghế</a></div>`,
    'tiec-cuoi-tai-nha': `
      <h2>1. Chốt quy mô trước khi chọn menu</h2>
      <p>Số khách quyết định phần lớn các hạng mục còn lại: số bàn, lượng món, nhân sự phục vụ và diện tích mái che. Hai gia đình nên thống nhất một danh sách chung, sau đó phân nhóm họ hàng, bạn bè và khách của cha mẹ để dễ sắp bàn.</p>
      <h2>2. Khảo sát không gian tổ chức</h2>
      <p>Tiệc tại nhà thường phải tận dụng sân, phòng khách hoặc một phần lối đi. Cần xác định khu đón khách, khu bàn tiệc, khu nấu, vị trí âm thanh và lối di chuyển của nhân viên. Nếu dựng rạp, hãy kiểm tra giờ được phép thi công và ảnh hưởng đến khu dân cư.</p>
      <h2>3. Lập ngân sách theo nhóm hạng mục</h2>
      <ul><li>Thực đơn và nước uống.</li><li>Bàn ghế, chén đĩa và khăn bàn.</li><li>Nhân sự phục vụ, đầu bếp và thu dọn.</li><li>Trang trí, rạp, âm thanh và ánh sáng.</li><li>Khoản dự phòng cho khách hoặc hạng mục phát sinh.</li></ul>
      <p>Không nên dồn toàn bộ ngân sách cho món ăn rồi thiếu chi phí vận hành. Một buổi tiệc thoải mái cần cả món phù hợp, bàn ghế sạch và quy trình phục vụ liền mạch.</p>
      <h2>4. Chọn menu cho hai gia đình</h2>
      <p>Nếu khách đến từ nhiều vùng miền, nên chọn vị trung hòa và có món quen thuộc. Các yêu cầu ăn chay, dị ứng hoặc kiêng nguyên liệu cần được báo sớm. Menu cũng nên phù hợp thời tiết: ngày nóng ưu tiên món thanh, ngày mưa có thể chọn món nóng và lẩu.</p>
      <h2>5. Tổng duyệt trước ngày tổ chức</h2>
      <p>Trước tiệc một đến ba ngày, hãy xác nhận lần cuối số bàn, giờ giao thiết bị, giờ ra món, người đại diện hai bên và số điện thoại đầu mối. Danh sách xác nhận bằng văn bản giúp hạn chế hiểu nhầm vào ngày bận rộn.</p>
      <div class="article__cta"><strong>Cần lên kế hoạch tiệc cưới tại nhà?</strong><a href="index.html#dat-tiec">Nhận tư vấn theo số khách</a></div>`,
    'tiec-cong-ty': `
      <h2>1. Khi nào nên chọn buffet?</h2>
      <p>Buffet phù hợp chương trình có nhiều hoạt động giao lưu, khách đến trong nhiều khung giờ hoặc cần tự do lựa chọn món. Hình thức này tạo không khí thoải mái nhưng cần đủ diện tích cho quầy món và luồng khách di chuyển.</p>
      <h2>2. Khi nào nên chọn tiệc bàn?</h2>
      <p>Tiệc bàn phù hợp lễ tổng kết, tri ân hoặc chương trình có sân khấu và lịch trình rõ ràng. Khách ngồi cố định, món được phục vụ theo lượt nên ban tổ chức dễ điều phối phần phát biểu, trao thưởng và văn nghệ.</p>
      <h2>3. So sánh theo nhu cầu thực tế</h2>
      <ul><li><strong>Không gian:</strong> buffet cần quầy món; tiệc bàn cần khoảng cách phục vụ.</li><li><strong>Thời gian:</strong> buffet linh hoạt hơn; tiệc bàn đồng bộ theo chương trình.</li><li><strong>Trải nghiệm:</strong> buffet khuyến khích giao lưu; tiệc bàn trang trọng và thư thả.</li><li><strong>Nhân sự:</strong> cả hai hình thức đều cần người bổ sung món, dọn dụng cụ và hỗ trợ khách.</li></ul>
      <h2>4. Xây dựng menu cho số đông</h2>
      <p>Nên ưu tiên món dễ dùng, khẩu vị vừa và có nhãn rõ nếu tổ chức buffet. Với tiệc bàn, cần tránh các món đòi hỏi thao tác phức tạp khi chia phần. Nếu công ty có nhân sự ăn chay hoặc dị ứng, hãy chuẩn bị lựa chọn riêng và đánh dấu rõ ràng.</p>
      <h2>5. Thông tin cần gửi khi yêu cầu báo giá</h2>
      <p>Ban tổ chức nên cung cấp ngày, địa điểm, số khách, thời lượng chương trình, hình thức mong muốn và ngân sách dự kiến. Nếu chưa quyết định buffet hay tiệc bàn, có thể yêu cầu hai phương án để so sánh trên cùng phạm vi dịch vụ.</p>
      <div class="article__cta"><strong>Chưa biết hình thức nào phù hợp?</strong><a href="index.html#dat-tiec">Gửi kế hoạch để nhận hai phương án</a></div>`
  };
  Object.entries(expansions).forEach(([id, html]) => {
    document.querySelector(`#${id} .article__content`)?.insertAdjacentHTML('beforeend', html);
  });
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
  const target = window.location.hash ? document.querySelector(window.location.hash) : null;
  if (target?.matches('.article')) {
    target.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
});
