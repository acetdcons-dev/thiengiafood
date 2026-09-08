(function (root, factory) {
  const menus = factory();
  if (typeof module === 'object' && module.exports) module.exports = menus;
  else root.PARTY_MENUS = menus;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const checkedAt = '2026-09-08';
  const featured = new Set([4, 14, 24, 34]);
  const raw = [
    [1,1500000, [['Soup cua tuyết trắng',300000],['Gỏi bò cải mầm',350000],['Cá diêu hồng hấp Hồng Kông',400000],['Cơm chiên cá mặn',350000],['Rau câu thập cẩm vị sắc',100000]]],
    [2,1650000, [['Khai vị: Chả giò hải sản + Mực chiên xù',350000],['Gỏi ngó sen tôm thịt + bánh phồng',350000],['Bò né + bánh đa',400000],['Lẩu cá diêu hồng măng chua + bún',450000],['Tráng miệng trái cây thập cẩm',100000]]],
    [3,1900000, [['Soup tôm trứng cút',350000],['Gỏi củ hủ dừa tôm thịt',350000],['Cá tai tượng chiên xù + Bánh tráng',350000],['Sườn non nấu lagu + Bánh mì',400000],['Miến xào hải sản',350000],['Tráng miệng rau câu dừa',100000]]],
    [4,2150000, [['Khai vị 2 món: Tôm tempura + Chạo cá chiên',350000],['Gỏi bò bóp thấu + bánh phồng',350000],['Cánh gà chiên nước mắm',350000],['Nai né bông bí + bánh đa',400000],['Lẩu Thái chua cay + bún',550000],['Tráng miệng bánh flan',150000]]],
    [5,2200000, [['Khai vị 2 món : Gỏi ngũ sắc + Chả giò hải sản mayo',450000],['Soup cua nấm tuyết',300000],['Tôm thẻ hấp bia',450000],['Bò né bông thiên lý + bánh đa',400000],['Lẩu hải sản chua cay + bún',500000],['Tráng miệng rau câu dừa',100000]]],
    [6,2200000, [['Khai vị 2 món: Chả giò tôm thịt + Khoai môn lệ phố',350000],['Gỏi ngũ sắc tôm thịt + bánh phồng',350000],['Cá tai tượng chiên xù + bánh tráng',350000],['Tôm hấp nước dừa',450000],['Lẩu gà tiềm ớt hiểm + bún',550000],['Tráng miệng rau câu dừa phomai',150000]]],
    [7,2250000, [['Soup cua hải sản',350000],['Bò trộn cải mầm',350000],['Gà nấu lagu + bánh mì',400000],['Cá lóc hấp bầu + bánh tráng',400000],['Lẩu cua đồng hải sản + bún',550000],['Tráng miệng bánh flan trái dừa',200000]]],
    [8,2350000, [['Soup tôm măng tây',300000],['Nai né + bánh đa',400000],['Gà hấp nấm cải thìa + xôi',500000],['Bò nấu tiêu xanh + bánh mì',400000],['Lẩu bao tử hầm tiêu xanh + bún',550000],['Bánh Flan trái dừa',200001]]],
    [9,2350000, [['Khai vị 2 món: Ốc nhồi thịt hấp + Há cảo hải sản hấp',350000],['Soup cua nấm tuyết',300000],['Vịt nướng giả chồn + bánh bao',550000],['Sườn non nấu tiêu xanh + bánh mì',400000],['Lẩu thái chua cay + bún',550000],['Chè nhãn nhục hạt sen táo đỏ',200000]]],
    [10,2400000, [['Khai vị 2 món: Chả giò hải sản + Mực chiên xù',350000],['Chả cá thác lác chiên cuộn cải xanh',500000],['Gà bó xôi chiên',500000],['Bò nấu lagu + bánh mì',400000],['Lẩu cá lăng măng chua + bún',550000],['Trái cây thập cẩm',100000]]],
    [11,2450000, [['Khai vị 3 món: Há cảo sò điệp + Cá trứng chiên giòn + Tôm chiên xù',500000],['Nai né + bánh đa',400000],['Cá tai tượng chiên xù + bánh tráng',350000],['Sườn sốt Thái Lan',500000],['Lẩu cá thác lác + bún',550000],['Tráng miệng bánh flan',150000]]],
    [12,2450000, [['Khai vị 3 món: Tôm lăn bột chiên xù + Khoai môn lệ phố + Chả giò hải sản',500000],['Cá chẽm sốt chanh dây',450000],['Bò né thập cẩm + bánh đa',400000],['Gà nấu lagu + bánh mì',400000],['Lẩu cua đồng hải sản + bún',550000],['Rau câu sơn thủy',150000]]],
    [13,2500000, [['Soup cua tóc tiên',350000],['Gà hấp nấm cải xanh + xôi',500000],['Bò nấu tiêu xanh + bánh mì',400000],['Giò heo nấu giả cầy',550000],['Lẩu ếch măng chua + bún',500000],['Tráng miệng Tàu hũ',200000]]],
    [14,2600000, [['Khai vị tứ sắc hòa quyện: Chả giò hải sản + Chạo cá chiên + Tôm chiên xù + Bò cuộn rau củ',650000],['Soup cua bắp non',300000],['Gỏi bò bóp thấu + bánh phồng',350000],['Gà quay chảo sốt mật ong + bánh bao',500000],['Lẩu riêu cua bắp bò + bún',600000],['Tráng miệng nho',200000]]],
    [15,2750000, [['Khai vị sắc màu tỏa sáng: Mực chiên xù + Chả giò hải sản + Cá thác lác lăn cốm + Khoai môn lệ phố',650000],['Gà nấu tiêu xanh + bánh mì',400000],['Tôm sú hấp bia',550000],['Bê xào lăn + bánh mì',550000],['Cơm chiên hải sản',350000],['Chè dưỡng nhan tuyết yến',250000]]],
    [16,2800000, [['Khai vị 3 món: Chả giò Naifood + Tôm tempura + Chả mực hạ Long',650000],['Sườn non nấu tiêu xanh+ bánh mì',400000],['Cá bống mú hấp Hồng Kông',650000],['Mực hấp sa tế',550000],['Cháo hàu nấm rơm',350000],['Bánh flan trái dừa',200000]]],
    [17,2800000, [['Soup cua tuyết trắng',300000],['Nai hấp tía tô',500000],['Lươn om chuối đậu',550000],['Tôm hấp bia',450000],['Lẩu cá chình măng chua',900000],['Tráng miệng rau câu',100000]]],
    [18,2850000, [['Soup cua trứng cút',350000],['Tôm càng sốt bơ tỏi',700000],['Bò né bông bí + bánh đa',400000],['Ếch xào lăn + bánh mì',500000],['Lẩu cá bóp măng chua + bún',750000],['Tráng miệng bánh flan',150000]]],
    [19,2900000, [['Soup cua sò điệp',350000],['Cá tai tượng chiên xù + Bánh tráng',350000],['Giò heo muối chiên giòn + kim chi',550000],['Mực hấp hành gừng',550000],['Lẩu cá chình măng chua + bún',900000],['Tráng miệng bánh flan trái dừa',200000]]],
    [20,3000000, [['Chả mực Hạ Long',500000],['Cá chép giòn om dưa',650000],['Gà lên mâm Tứ Quý',550000],['Tôm sú sốt trứng muối',550000],['Lẩu lươn hoa chuối + bún',550000],['Chè nhãn nhục hạt sen táo đỏ',200000]]],
    [21,3150000, [['Khai vị tam sắc màu: Chả giò hải sản + Cá thác lác lăn cốm + Cá trứng chiên giòn',500000],['Cá bống mú hấp Hồng Kong',650000],['Bò tơ cuộn rau rừng',500000],['Dê hấp tía tô',600000],['Lẩu cá tầm + bún',750000],['Tráng miệng bánh flan',150000]]],
    [22,3200000, [['Khai vị 3 món: Chả giò hải sản + Mực chiên xù + Khoai môn lệ phố',500000],['Cá chép giòn om dưa',650000],['Gà bó xôi chiên',500000],['Bê hấp tía tô',550000],['Lẩu cá hồi fillet + bún',750000],['Chè dưỡng nhan tuyết yến',250000]]],
    [23,3250000, [['Soup bắp gà xé trứng cút',350000],['Mực hấp sa tế',550000],['Tôm càng hấp nước dừa',700000],['Giò heo nấu giả cầy + bánh mì',550000],['Lẩu cá chình măng chua + bún',900000],['Chè trôi nước',200000]]],
    [24,3300000, [['Khai vị tam sắc hòa quyện: Chả giò hải sản + Tôm chiên xù + Bò cuộn phô mai rau củ',500000],['Tôm sú hấp nước dừa',550000],['Heo sữa quay mật ong + bánh bao',950000],['Mực hấp hành gừng',550000],['Lẩu gà lá é + bún',550000],['Tráng miệng nho',200000]]],
    [25,3450000, [['Chả mực Hạ Long',500000],['Bồ câu xây tổ + bánh bao',650000],['Baba om chuối đậu',750000],['Cá tầm nướng muối ớt',750000],['Lẩu riêu cua bắp bò + bún',600000],['Trái cây bốn mùa',200000]]],
    [26,3450000, [['Khai vị sắc màu tỏa sáng: Chả giò hải sản + Cá trứng chiên xù + Há cảo tôm sò điệp hấp + Gỏi ngó sen tôm thịt',650000],['Gà bó xôi chiên',500000],['Dê xối sả',650000],['Giò heo muối chiên giòn + Kim chi',550000],['Lẩu cá chình măng chua + bún',900000],['Tráng miệng bánh flan trái dừa',200000]]],
    [27,3600000, [['Soup cua tôm măng tây',350000],['Tôm sú sốt me',550000],['Cá lăng nướng muối ớt',550000],['Bạch tuộc sống nhúng mẻ',750000],['Lẩu ghẹ + bún',1200000],['Tráng miệng bánh flan trái dừa',200000]]],
    [28,3600000, [['Chả mực hạ long',500000],['Gà mẹt Phú Quý',550000],['Tôm sú hấp nước dừa',550000],['Lươn xào lăn + bánh mì',550000],['Lẩu cua biển + bún',1200000],['Chè dưỡng nhan tuyết yến',250000]]],
    [29,3750000, [['Khai vị tam sắc màu: Chả giò hải sản + Chả mực Hạ Long + Gỏi bắp bò rau muống',600000],['Bồ câu quay chảo + bánh bao',650000],['Cua biển sốt trứng muối',1200000],['Cá chẽm hấp kỳ lân',450000],['Cháo sò huyết cồ nấm rơm',650000],['Trái cây nhiệt đới',200000]]],
    [30,3900000, [['Chả mực hạ long',500000],['Dê nhúng mẻ',650000],['Tôm càng xanh nướng mọi',700000],['Baba om chuối đậu',750000],['Lẩu Phú Quý Kim Tiền + bún',850000],['Dâu tây nhập khẩu',450000]]],
    [31,3900000, [['Khai vị 3 món : Chả giò hải sản + Cá trứng chiên giòn + Gỏi bò rau muống',500000],['Cua lột sốt trứng muối',1200000],['Mực hấp hành gừng',550000],['Cá chép giòn om dưa',650000],['Bồ câu tiềm ngũ vị + mì',850000],['Tráng miệng bánh flan',150000]]],
    [32,4050000, [['Gà bó xôi chiên',500000],['Cá tầm nướng muối ớt',750000],['Tôm sú sốt bơ tỏi',550000],['Ghẹ xanh hấp nước dừa',1200000],['Lẩu ngọc dương + mì',850000],['Tráng miệng bánh flan trái dừa',200000]]],
    [33,4400000, [['Chả mực Hạ Long',500000],['Đùi dê nướng',1000000],['Cua biển sốt trứng muối',1200000],['Cá Mú hấp HongKong',650000],['Lẩu riêu cua bắp bò + bún',600000],['Nho mỹ nhập khẩu',450000]]],
    [34,4850000, [['Khai vị 3 món : Chả giò hải sản mayo + Chả mực hạ long + Cua lột sốt trứng muối',850000],['Tôm càng xanh sốt bơ tỏi',700000],['Bạch tuộc sống nhúng mẻ',750000],['Ghẹ sống sốt thái',1200000],['Lẩu cá chình măng chua',900000],['Dâu tây nhập khẩu',450000]]],
    [35,7650000, [['Soup cua tôm sò điệp',400000],['Nai né + bánh đa',400000],['Cá chép giòn om dưa',650000],['Bò hầm rượu vang + bánh mì',450000],['Lẩu tôm hùm + bún',5500000],['Chè dưỡng nhan tuyết yến',250000]]],
    [36,9800000, [['Soup cua đông trùng hạ thảo',550000],['Tôm càng hấp bia',700000],['Cá mú hấp Hồng Kông',650000],['Dê xối sả',650000],['Lẩu Tôm hùm Alaska + bún',6500000],['Cherry nhập khẩu',750000]]],
    [37,10300000, [['Soup cua bào ngư',550000],['Tôm càng xanh sốt trứng muối',700000],['Cá chình nướng muối ớt',900000],['Ghẹ xanh hấp bia',1200000],['Lẩu Tôm hùm size lớn + bún',6500000],['Táo Mỹ nhập khẩu',450000]]],
    [38,11450000, [['Khai vị 4 món: Gỏi ngó sen tôm thịt + Khoai môn lệ phố+ Chả giò hải sản + Cua lột sốt trứng muối',900000],['Tôm càng xanh sốt trứng muối',700000],['Cá Chình nướng muối ớt',900000],['Đùi Dê nướng',1000000],['Lẩu cua Hoàng Đế + bún',7500000],['Nho Mỹ nhập khẩu',450000]]]
  ];

  const money = value => `${value.toLocaleString('en-US')}đ`;
  const tier = value => value < 2000000 ? 'Dưới 2 triệu' : value < 3000000 ? 'Từ 2 đến dưới 3 triệu' : value < 5000000 ? 'Từ 3 đến dưới 5 triệu' : 'Từ 5 triệu trở lên';
  const normalizeDishName = name => name
    .replace(/\bSoup\b/g, 'Súp')
    .replace(/\bNaifood\b/gi, 'Thiên Gia Food')
    .replace(/\b(?:Hong\s*Kong|Hồng Kong)\b/gi, 'Hồng Kông')
    .replace(/\bBánh Flan\b/g, 'Bánh flan')
    .replace(/\bhạ long\b/gi, 'Hạ Long')
    .replace(/\b(Lẩu|sốt) thái\b/g, '$1 Thái')
    .replace(/\bNho mỹ\b/g, 'Nho Mỹ')
    .replace(/\s+:/g, ':')
    .replace(/\s*\+\s*/g, ' + ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  const imageHighlights = [
    'cá diêu hồng hấp, gỏi bò và cơm chiên', 'bò né, gỏi ngó sen và lẩu cá', 'cá tai tượng chiên, sườn lagu và miến xào', 'nai né, cánh gà chiên và lẩu Thái',
    'tôm hấp, bò né và lẩu hải sản', 'cá tai tượng chiên, tôm hấp và lẩu gà', 'cá lóc hấp, gà lagu và lẩu cua đồng', 'gà hấp nấm, bò tiêu xanh và lẩu bao tử',
    'vịt nướng, sườn tiêu xanh và lẩu Thái', 'chả cá cuộn, gà bó xôi và lẩu cá lăng', 'cá tai tượng chiên, sườn sốt và lẩu cá', 'cá chẽm sốt, bò né và lẩu cua đồng',
    'gà hấp nấm, giò heo giả cầy và lẩu ếch', 'gà quay, gỏi bò và lẩu riêu cua', 'tôm hấp, bê xào và gà tiêu xanh', 'cá bống mú hấp, mực sa tế và sườn tiêu xanh',
    'nai hấp, lươn om và lẩu cá chình', 'tôm càng, ếch xào và lẩu cá bóp', 'giò heo chiên, mực hấp và lẩu cá chình', 'cá chép om dưa, gà lên mâm và tôm sốt trứng muối',
    'cá bống mú hấp, bò cuộn rau và dê hấp', 'cá chép om dưa, gà bó xôi và lẩu cá hồi', 'tôm càng hấp, giò heo giả cầy và lẩu cá chình', 'heo sữa quay, tôm hấp và lẩu gà lá é',
    'bồ câu, baba om và cá tầm nướng', 'gà bó xôi, dê xối sả và giò heo chiên', 'tôm sốt me, cá lăng nướng và lẩu ghẹ', 'gà mẹt, tôm hấp và lẩu cua biển',
    'bồ câu quay, cua sốt trứng muối và cá chẽm hấp', 'dê nhúng mẻ, tôm càng nướng và baba om', 'cua lột sốt, cá chép om và bồ câu tiềm', 'cá tầm nướng, ghẹ hấp và lẩu ngọc dương',
    'đùi dê nướng, cua sốt trứng muối và cá mú hấp', 'tôm càng sốt bơ, bạch tuộc nhúng và ghẹ sốt', 'cá chép om, bò hầm và lẩu tôm hùm', 'tôm càng hấp, cá mú hấp và lẩu tôm hùm Alaska',
    'tôm càng sốt trứng muối, cá chình nướng và lẩu tôm hùm', 'tôm càng sốt trứng muối, đùi dê nướng và lẩu cua hoàng đế'
  ];
  return raw.map(([number, totalPriceNumeric, dishes]) => {
    const pad = String(number).padStart(2, '0');
    return Object.freeze({
      id: `menu-${pad}`,
      number,
      name: `Thực đơn ${pad}`,
      slug: `thuc-don-${pad}`,
      totalPrice: money(totalPriceNumeric),
      totalPriceNumeric,
      dishes: dishes.map(([dishName, dishPriceNumeric]) => {
        const normalizedPrice = number === 8 && dishPriceNumeric === 200001 ? 200000 : dishPriceNumeric;
        return Object.freeze({ dishName: normalizeDishName(dishName), dishPrice: money(normalizedPrice), dishPriceNumeric: normalizedPrice });
      }),
      category: 'Thực đơn đãi tiệc',
      priceTier: tier(totalPriceNumeric),
      featured: featured.has(number),
      image: `assets/images/source-menus/menu-${pad}-original.jpg`,
      imageAlt: `Hình ảnh món ăn trong thực đơn ${pad}: ${imageHighlights[number - 1]}`,
      sourceCheckedAt: checkedAt,
      status: 'normalized'
    });
  });
});
