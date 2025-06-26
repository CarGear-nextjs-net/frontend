export default function AboutPage() {
  return (
    <section className="about-page px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Về Chúng Tôi</h1>

      <p className="mb-4 text-lg">
        Chào mừng bạn đến với <strong>CarGear</strong> – nơi bạn có thể tìm thấy mọi thứ bạn cần cho
        cuộc sống hiện đại!
      </p>

      <p className="mb-4 text-lg">
        Từ những ngày đầu thành lập, mục tiêu của chúng tôi là mang đến trải nghiệm mua sắm trực
        tuyến tuyệt vời, uy tín và nhanh chóng. Chúng tôi tập trung vào việc cung cấp các sản phẩm
        chất lượng cao với mức giá hợp lý, cùng với dịch vụ khách hàng tận tâm.
      </p>

      <p className="mb-4 text-lg">
        <strong>CarGear</strong> chuyên cung cấp:
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Thiết bị công nghệ & phụ kiện chính hãng</li>
          <li>Thời trang phong cách & phụ kiện cá nhân</li>
          <li>Đồ gia dụng thông minh</li>
          <li>Chương trình khuyến mãi và ưu đãi hấp dẫn hàng tuần</li>
        </ul>
      </p>

      <p className="mb-4 text-lg">
        Với đội ngũ nhân viên trẻ, năng động và đầy nhiệt huyết, chúng tôi luôn không ngừng cải tiến
        để phục vụ bạn tốt hơn mỗi ngày.
      </p>

      <div className="mt-10 text-lg">
        <h2 className="text-2xl font-semibold mb-2">Thông tin liên hệ</h2>
        <p>📍 Địa chỉ: 123 Đường ABC, Hà Nội</p>
        <p>📞 Hotline: 0909 999 999</p>
        <p>📧 Email: support@shopgear.com</p>
      </div>
    </section>
  );
}
