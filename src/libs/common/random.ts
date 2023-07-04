/**
 * 获取时间随机数
 * @param {number} len
 * @returns
 */
export function RandomTimeStr(prefix = new Date().getTime(), len = 18) {
  const chars = '012345678';
  const maxPos = chars.length;
  let pwd = prefix.toString();
  const maxLen = len - pwd.length;
  for (let i = 0; i < maxLen; i += 1) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

const words =
  'accountant ability accident account action activity actor ad addition address adult advantage advertisement afternoon agency agent air airline airplane airport alarm alligator ambulance analyst angle animal answer apartment apple application appointment architect argument area arm army art article artist australia author autumn baby baker balloon banana barista battery beach bear beard bed belgium bird bit book boots boy branch breakfast brother businessperson butcher byte camera candle car caravan carpenter carpet cartoon cat chef child china church city coat coffeeshop computer continent controller country cpu crayon cricket crowd daughter dawn daybreak death denmark dentist diamond dinner disease doctor dog dream dress dusk easter egg eggplant egypt electrician elephant energy engine engineer england eve evening eventide exabyte eye fall family farmer father finland fireman fish flag florist flower football forest fountain france furniture garage garden gas ghost gigabyte girl glass gold gpu grandmother grass greece guitar hair hairdresser hamburger helicopter helmet holiday honey horse hospital house hydrogen ice insect insurance intern iron island jackal jelly jewellery jordan journalist joystick judge juice kangaroo keyboard kilobyte king kitchen kite knife lamp laptop lawyer leather librarian library lifeguard lighter lion lizard lock london lunch machine magazine magician man manchester market match mechanic megabyte memory microphone midnight minister monitor monkey morn morning mother motherboard motorcycle mouse musician nail napkin needle nest nigeria night nightfall noon notebook nurse ocean oil optician orange oxygen oyster pager painter painting park parrot pencil petabyte pharmacist photographer piano pillow pilot pizza planet plastic plumber policeman portugal postman potato printer processor psychiatrist queen quill rain rainbow raincoat ram receptionist refrigerator restaurant river rocket room rose russia salesclerk salesmen sandwich school scientist scooter secretary shampoo shoe smartphone soccer solstice spoon spring state stone student sugar summer sundown sunset sweden table tailor teacher teenager telephone television tent terabyte thailand tiger toddler tomato toothbrush traffic train translator truck twilight uganda umbrella van vase vegetable vr vulture waiter waitress wall whale window winter wire wolf woman xylophone yacht yak yottabyte zebra zettabyte zoo abandoned abiding able abrasive abnormal absurd abundant acceptable acidic acoustic acrid adamant adorable adventurous aggressive agitated agreeable alert alive aloof ambitious ancient angry annoyed antsy anxious appalling appetizing apprehensive arrogant ashamed astonishing attractive average bad bald bashful beautiful beefy belligerent bent better best better bewildered big billions billowy bitter black bland blue blushing bored boring boundless brainy brash brave breezy brief bright broad broken brown bulky bumpy burly busy cagey calm callous careful chilly chubby clean clever clumsy cold colossal cool crashing creamy crooked cuddly curved damaged damp dazzling dead deafening deep defeated delicious delightful dirty disgusting drab dry eager early easy echoing elegant embarrassed enough faint faithful famous fancy fast fat few fierce fit flabby flaky flat fluffy freezing fresh full future gentle gifted gigantic glamorous gorgeous gray greasy great green grumpy hallowed handsome happy harsh helpful helpless high hissing hollow hot howling huge hundreds icy immense important incalculable inexpensive itchy jealous jolly juicy kind large late lazy lemon limited little lively long loose loud low magnificent mammoth mango many massive mealy melodic melted microscopic millions miniature modern moldy most muscular mushy mysterious narrow nervous nice noisy numerous nutritious nutty obedient obnoxious odd old orange panicky petite pitiful plain plump polite poor powerful prehistoric prickly proud puny purple purring putrid quaint quick quiet rancid rapid rapping raspy red refined repulsive rhythmic rich ripe rotten rough round salmon salty savory scarce scary scrawny screeching scruffy shaggy shallow shapely sharp short shrilling shy silly skinny slimy slow small some sour sparse spicy spoiled square squeaking stale steep sticky stocky straight strong substantial sweet swift tall tangy tart tasteless tasty teeny tender thankful thoughtless thousands thundering tight tinkling tiny ugly uneven unimportant uninterested unkempt unsightly uptight vast victorious wailing warm weak wet whining whispering white wide witty wonderful wooden worried wrong yellow young yummy zealous'.split(
    ' '
  );
const len = words.length;

/**
 * [zh] 随机数字
 * @param {number} num1 数字1
 * @param {number} num2 数字2
 * @return {void} true
 */
export function RandomNum(num1: number, num2: number) {
  const start = Math.min(num1, num2);
  return Math.random() * (Math.max(num1, num2) - start) + start;
}


/**
 * 随机名字
 * @returns {string}
 */
export function RandomEnName() {
  return `${words[Math.round(RandomNum(0, len))].replace(/^\S/, (s) => s.toUpperCase())} ${words[Math.round(RandomNum(0, len))].replace(/^\S/, (s) => s.toUpperCase())}`;
}


/**
 * [zh] 将number保留bitNum位小数，不够补0
 * @param {number|string} number
 * @param {number} bitNum
 * @returns {string|number}
 */
export function ChangeDecimal(number: string, bitNum = 0) {
  if (isNaN(parseFloat(number))) {
    return 0;
  }
  let sNum = number.toString();
  let decimal = sNum.indexOf('.');
  if (decimal < 0) {
    // 没有小数
    decimal = sNum.length;
    if (bitNum !== 0) {
      sNum += '.';
    } else {
      return sNum;
    }
  }
  if (sNum.length <= decimal + bitNum) {
    while (sNum.length <= decimal + bitNum) {
      sNum += '0';
    }
  } else {
    sNum = sNum.substring(0, decimal + bitNum + (bitNum > 0 ? 1 : 0));
  }
  return sNum;
}

/**
 * 随机Hash
 * @param len
 * @returns
 */
export const RandomHash = (len: number) => {
  //16进制
  let radix = 16;
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++)
      uuid[i] = chars[0 | Math.random() * radix];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}
