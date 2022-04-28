import starter1img from './images/crab-meat.jpg';
import starter2img from './images/kunafa.jpg';
import starter3img from './images/mussels.jpg';
import starter4img from './images/shrimp.jpg';
import salad1img from './images/fatsalad.jpg';
import salad2img from './images/prawn-caeser.jpg';
import salad3img from './images/smoked-salmon.jpg';
import salad4img from './images/oriental-salad.jpg';
import main1img from './images/tilapiacombo.jpg';
import main2img from './images/pennepasta.jpg';
import main3img from './images/biryani.jpg';
import main4img from './images/diamondsea.jpg';

const startersData={
        starters:[
            {
            id:1,
            img:starter1img,
            name:"Crab Meat",
            arab:"لحم السلطعون",
            price:parseFloat(3.800).toFixed(3),
            quantity:"2",
            },
            {
            id:2,
            img:starter2img,
            name:"Kunafa Shrimp",
            arab:"كنافة جمبري",
            price:parseFloat(3.000).toFixed(3),
            quantity:"1"
            },
            {
            id:3,
            img:starter3img,
            name:"Mussels Thermidor",
            arab:"بلح البحر ثيرميدور",
            price:parseFloat(3.500).toFixed(3),
            quantity:"5"
            },
            {
            id:4,
            img:starter4img,
            name:"Shrimp Spring roll",
            arab:"سبرينج رول روبيان",
            price:parseFloat(2.900).toFixed(3),
            quantity:"10"
            },
        ],
        salad:[
            {
            id:5,
            img:salad1img,
            name:"Fatoush Salad",
            arab:"سلطة فتوش",
            price:parseFloat(1.500).toFixed(3),
            quantity:"3"
            },
            {
            id:6,
            img:salad2img,
            name:"Prawns Caeser",
            arab:"سيزر روبيان",
            price:parseFloat(2.900).toFixed(3),
            quantity:"2"
            },
            {
            id:7,
            img:salad3img,
            name:"Smoked salmon",
            arab:"سلمون مدخن",
            price:parseFloat(4.800).toFixed(3),
            quantity:"2"
            },
            {
            id:8,
            img:salad4img,
            name:"Oriental Salad",
            arab:"سلطة شرقية",
            price:parseFloat(1.300).toFixed(3),
            quantity:"6"
            }
        ],
        mainCours:[
            {
            id:9,
            img:main1img,
            name:"TILAPIA COMBO",
            arab:"كومبو سمك",
            price:parseFloat(1.800).toFixed(3),
            quantity:"1"
            },
            {
            id:10,
            img:main2img,
            name:"PENNE PASTA",
            arab:" بيني باستا",
            price:parseFloat(3.500).toFixed(3),
            quantity:"7"
            },
            {
            id:11,
            img:main3img,
            name:"CHICKEN BRIANI",
            arab:"سمك البلطي",
            price:parseFloat(1.300).toFixed(3),
            quantity:"9"
            },
            {
            id:12,
            img:main4img,
            name:"Seafood Platter",
            arab:"البحرية الماسي",
            price:parseFloat(8.800).toFixed(3),
            quantity:"1"
            },
        ]
        
};
export default startersData;

