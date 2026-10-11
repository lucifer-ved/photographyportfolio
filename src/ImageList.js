import one from  './Images/1.jpeg';
import to from  './Images/2.jpeg';
import thre from  './Images/3.jpeg';
import four from  './Images/4.jpeg';
import fiv from  './Images/5.jpeg';
import six from  './Images/6.jpeg';
import svn from  './Images/7.jpg';
import eit from  './Images/8.jpeg';
import nin from  './Images/9.jpeg';
import ten from  './Images/10.jpg';
import elvn from  './Images/11.jpeg';
import twlv from  './Images/12.jpeg';
import thirten from  './Images/13.jpeg';
import forten from  './Images/14.jpeg';
import fiften from  './Images/15.jpeg';
import sixten from  './Images/16.jpeg';
import svnten from  './Images/17.jpg';
import eigten from  './Images/18.jpeg';
import ninten from  './Images/19.jpeg';
import twenty from  './Images/20.jpeg';
import twny1 from  './Images/21.jpeg';
import twny2 from  './Images/22.jpeg';
import twny3 from  './Images/23.jpeg';
import twny4 from  './Images/24.jpg';
import twny5 from  './Images/25.jpeg';
import twny6 from  './Images/26.jpeg';
import twny7 from  './Images/27.jpeg';
import twny8 from  './Images/28.jpeg';
import twny9 from  './Images/29.jpeg';
import thirty from  './Images/30.jpeg';
import above1 from  './Images/1above.jpeg';



export const images = [
    above1,
    one,
    to,
    thre,
    four,
    fiv,
    six,
    svn,
    eit,
    nin,
    ten,
    elvn,
    twlv,
    thirten,
    forten,
    fiften,
    sixten,
    svnten,
    eigten,
    ninten,
    twenty,
    twny1,
    twny2,
    twny3,
    twny4,
    twny5,
    twny6,
    twny7,
    twny8,
    twny9,
    thirty
]

// Lighter copies used for the flying tiles; the full file loads when a photo is opened.
const smallFiles = require.context('./Images/small', false, /\.jpg$/);
const small = name => {
    const file = smallFiles(`./${name}.jpg`);
    return file.default || file;
};

export const photos = [
    { src: above1, small: small('1above'), title: 'Dopahar', meaning: 'Afternoon', category: 'Streets', width: 3098, height: 1995 },
    { src: one, small: small('1'), title: 'Masoom', meaning: 'Innocent', category: 'Portraits', width: 1600, height: 2400 },
    { src: to, small: small('2'), title: 'Sunehri Jheel', meaning: 'Golden lake', category: 'Landscapes', width: 5625, height: 3815 },
    { src: thre, small: small('3'), title: 'Kajal', meaning: 'Kohl', category: 'Portraits', width: 2228, height: 4608 },
    { src: four, small: small('4'), title: 'Muskaan', meaning: 'Smile', category: 'Streets', width: 2333, height: 1371 },
    { src: fiv, small: small('5'), title: 'Rang Barse', meaning: 'Colours rain down', category: 'Festival', width: 2284, height: 1600 },
    { src: six, small: small('6'), title: 'Santakukdi', meaning: 'Hide and seek', category: 'Portraits', width: 1600, height: 2400 },
    { src: svn, small: small('7'), title: 'Toward the Sun', meaning: '', category: 'Landscapes', width: 1774, height: 2669 },
    { src: eit, small: small('8'), title: 'Aashiyana', meaning: 'A nest, a home', category: 'Landscapes', width: 2346, height: 1535 },
    { src: nin, small: small('9'), title: 'Tapasya', meaning: 'Devotion through hardship', category: 'Portraits', width: 1600, height: 2400 },
    { src: ten, small: small('10'), title: 'Lost in Lines', meaning: '', category: 'Streets', width: 2331, height: 1554 },
    { src: elvn, small: small('11'), title: 'Safar', meaning: 'Journey', category: 'Streets', width: 1600, height: 2400 },
    { src: twlv, small: small('12'), title: 'Azaad', meaning: 'Free', category: 'Landscapes', width: 1485, height: 939 },
    { src: thirten, small: small('13'), title: 'Himmat', meaning: 'Courage', category: 'Streets', width: 1600, height: 2400 },
    { src: forten, small: small('14'), title: 'Maun', meaning: 'Silence', category: 'Landscapes', width: 2353, height: 1536 },
    { src: fiften, small: small('15'), title: 'Hasti Aankhen', meaning: 'Laughing eyes', category: 'Portraits', width: 2400, height: 1453 },
    { src: sixten, small: small('16'), title: 'Mukti', meaning: 'Release', category: 'Landscapes', width: 2353, height: 1322 },
    { src: svnten, small: small('17'), title: 'Adhoora', meaning: 'Incomplete', category: 'Portraits', width: 1556, height: 2400 },
    { src: eigten, small: small('18'), title: 'Humsafar', meaning: 'Fellow traveller', category: 'Landscapes', width: 2623, height: 1625 },
    { src: ninten, small: small('19'), title: 'Shikhar', meaning: 'Summit · Triund', category: 'Landscapes', width: 2110, height: 1484 },
    { src: twenty, small: small('20'), title: 'Aamer ka Aasmaan', meaning: "Amer's sky · Jaipur", category: 'Landscapes', width: 1600, height: 2400 },
    { src: twny1, small: small('21'), title: 'Gulal', meaning: 'Holi colour', category: 'Festival', width: 1600, height: 2400 },
    { src: twny3, small: small('23'), title: 'Bhaibandh', meaning: 'Close friends', category: 'Streets', width: 1442, height: 2398 },
    { src: twny4, small: small('24'), title: 'Umeed', meaning: 'Hope', category: 'Portraits', width: 1600, height: 2400 },
    { src: twny5, small: small('25'), title: 'Chaukhat', meaning: 'A door frame', category: 'Streets', width: 1600, height: 2400 },
    { src: twny6, small: small('26'), title: 'Palat', meaning: 'The turn back · Yamuna ghat, Vrindavan', category: 'Festival', width: 857, height: 1343 },
    { src: twny7, small: small('27'), title: 'Faag', meaning: 'Holi of Braj · Radharani temple', category: 'Festival', width: 2997, height: 3996 },
    { src: twny8, small: small('28'), title: 'Saanjh', meaning: 'Dusk', category: 'Landscapes', width: 1963, height: 3178 },
    { src: twny9, small: small('29'), title: 'Alaav', meaning: 'Bonfire', category: 'Streets', width: 1612, height: 2908 },
    { src: thirty, small: small('30'), title: 'Perched', meaning: '', category: 'Landscapes', width: 4160, height: 2090 },
];
