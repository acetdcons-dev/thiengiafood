'use strict';

const fs = require('node:fs');
const path = require('node:path');
const menus = require('../data/party-menus.js');

const money = value => `${value.toLocaleString('vi-VN')}đ`;
const expected = Array.from({ length: 38 }, (_, index) => index + 1);
const numbers = menus.map(menu => menu.number);
const errors = [];

if (menus.length !== 38) errors.push(`Có ${menus.length} thực đơn, yêu cầu 38.`);
expected.filter(number => !numbers.includes(number)).forEach(number => errors.push(`Thiếu thực đơn ${number}.`));
numbers.filter((number, index) => numbers.indexOf(number) !== index).forEach(number => errors.push(`Trùng thực đơn ${number}.`));

const rows = menus.map(menu => {
  const issues = [];
  if (!menu.totalPriceNumeric) issues.push('Thiếu tổng giá');
  if (!menu.dishes.length) issues.push('Thiếu món');
  menu.dishes.forEach(dish => {
    if (!dish.dishName || !dish.dishPriceNumeric) issues.push('Món thiếu tên hoặc giá');
    if (dish.dishPriceNumeric % 1000 !== 0) issues.push(`Giá nghi vấn: ${dish.dishPrice}`);
    if (/\s+:/.test(dish.dishName)) issues.push('Khoảng trắng trước dấu hai chấm');
    if (/\S\+|\+\S/.test(dish.dishName)) issues.push('Dấu + dính chữ');
    if (/Naifood/i.test(dish.dishName)) issues.push('Có tên thương hiệu nguồn');
    if (/\b(?:Hong ?Kong|Hồng Kong|HongKong)\b/.test(dish.dishName)) issues.push('Cách viết Hong Kong/Hồng Kông chưa thống nhất');
    if (/\bSoup\b/.test(dish.dishName)) issues.push('Cách viết Soup/Súp chưa thống nhất');
    if (/\bBánh Flan\b/.test(dish.dishName)) issues.push('Viết hoa bánh flan chưa thống nhất');
    if (/hạ long/.test(dish.dishName)) issues.push('Viết hoa Hạ Long chưa thống nhất');
    if (/\b(?:Lẩu thái|sốt thái)\b/.test(dish.dishName)) issues.push('Viết hoa Thái chưa thống nhất');
    if (/\bNho mỹ\b/.test(dish.dishName)) issues.push('Viết hoa Mỹ chưa thống nhất');
  });
  const dishTotal = menu.dishes.reduce((sum, dish) => sum + dish.dishPriceNumeric, 0);
  const difference = dishTotal - menu.totalPriceNumeric;
  if (difference) issues.push('Tổng giá món không khớp giá công bố');
  const uniqueIssues = [...new Set(issues)];
  return { menu, dishTotal, difference, issues: uniqueIssues };
});

const escapeCell = value => String(value).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const report = [
  '# Kiểm toán dữ liệu 38 thực đơn',
  '',
  `- Nguồn đối chiếu: https://naifood.com/thuc-don-dai-tiec/`,
  `- Ngày kiểm tra nguồn: ${menus[0]?.sourceCheckedAt || 'không xác định'}`,
  '- Dữ liệu đã được chuẩn hóa cách viết, khoảng trắng và tên riêng; mức giá công bố của từng thực đơn được giữ nguyên.',
  '- Ảnh món ăn trên trang thực đơn được giữ theo mẫu nguồn; phần khung viền và giao diện thẻ do Thiên Gia Food thiết kế lại.',
  '',
  '| Menu | Giá công bố | Tổng giá món | Chênh lệch | Vấn đề | Đề xuất |',
  '|---|---:|---:|---:|---|---|',
  ...rows.map(({ menu, dishTotal, difference, issues }) => {
    const suggestion = issues.length ? 'Cần xử lý' : 'Đã đạt';
    return `| ${menu.name} | ${menu.totalPrice} | ${money(dishTotal)} | ${difference === 0 ? '0đ' : `${difference > 0 ? '+' : ''}${money(difference)}`} | ${escapeCell(issues.join('; ') || 'Không phát hiện')} | ${suggestion} |`;
  }),
  '',
  '## Kết luận',
  '',
  `- Đủ dải số 1-38: ${errors.length ? 'Không' : 'Có'}.`,
  `- Thực đơn cần duyệt do tổng tiền lệch: ${rows.filter(row => row.difference).map(row => row.menu.number).join(', ') || 'Không có'}.`,
  `- Thực đơn có ít nhất một vấn đề định dạng/cách viết: ${rows.filter(row => row.issues.length).map(row => row.menu.number).join(', ') || 'Không có'}.`,
  '- Tên thương hiệu nguồn trong Thực đơn 16 được thay bằng tên Thiên Gia Food trong dữ liệu xuất bản.',
  ''
].join('\n');

if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(__dirname, '..', 'MENU-DATA-AUDIT.md'), report, 'utf8');
}

console.log(report);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
}
