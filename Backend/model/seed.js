const prisma = require("./index");

const createMany = async () => {
  await prisma.restaurant.createMany({
    data: [
      {
        name: "La Closerie",
        category: ["Italian"],
        description:
          "La Closerie is a combination of worlds: the glamour of LA meets laidback Mediterranean at this lively resto-club. The dishes are inspired by Italian classics, with a tinge of the French Riviera (look out for the steamed mussels with mustard).",
        main_image:
          "https://www.theworlds50best.com/discovery/filestore/jpg/La-Closerie-Tunis-Tunisia%20(1).jpg",
        menu_images: [
          "https://res.cloudinary.com/tf-lab/image/upload/w_1200,c_fill,g_auto:subject,q_auto,f_auto/pg_5/menu/20914b87-3a53-4e55-8e18-5ce5730457bb/0e179cc4-6886-49db-a103-80946a773db5.jpg",
          "https://lh3.googleusercontent.com/p/AF1QipPOwpsKy8LLvPygDVS32i3DWCN3Ph79NMLdQUaM=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipMY0E5smSNUfPXYy-p3HT4TUyULInm-OOlvbBMg=s680-w680-h510"
        ],
        extra_images:[
          "https://www.theworlds50best.com/discovery/filestore/jpg/La-Closerie-Tunis-Tunisia%20(1).jpg",
          "https://lh3.googleusercontent.com/p/AF1QipOt5vPsDcnsscaxYmgkFlG7a6YogGGLHcuJJL5R=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipOv6fFE7Yn4lT-65uswE1BiZ8ClkrGuAWVF1L54=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipM7lL_4EmwYWi4JUOvGI24BhL5g9yXYph_1iWJc=s680-w680-h510",
        ],
        City: "Tunis",
        phone_number: 70938537,
        reservation_quota: 20,
        latitude: 36.8677,
        longtitude: 10.2887,
        opening_time: new Date("2019-01-16 12:00:00"),
        closing_time: new Date("2019-01-16 22:00:00"),
        ownerId: 1,
      },
      {
        name: "La Villa",
        category: ["Tunisian"],
        description:
          "Discover a combination of different emotions from the romantic and eccentric chimney bar to the minimalist charm of the lounge and its onyx white counter. Pass by the refined, yet youthful Moroccan Café after having savoured the Mediterranean fusion cuisine of La Villa's Fine Dining room. Choose between terraces and lounges, to be seen or remain discreet",
        menu_images: [
          "https://media-cdn.tripadvisor.com/media/photo-m/1280/22/b9/54/61/menu.jpg",
        ],
        extra_images:[
        "https://lh3.googleusercontent.com/p/AF1QipMgNYBBgxa3453Akv7EGDeYgnA5RsCuIzTB_akL=s680-w680-h510"  ,
        "https://lh3.googleusercontent.com/p/AF1QipONiZGPrbAJkkH1MS6YVBRj16vuBNUnFGsp64ui=s680-w680-h510",
        "https://lh3.googleusercontent.com/p/AF1QipOuoez_C9aHl3uLzlkjriZlT4l_rsXFJOjRQJqZ=s680-w680-h510",
        "https://lh3.googleusercontent.com/p/AF1QipMavbRYXbYq6ODxxEW_eg35paYvQ0J_rYMGBcnX=s680-w680-h510",
        ],
        main_image:
          "https://lh3.googleusercontent.com/p/AF1QipMgNYBBgxa3453Akv7EGDeYgnA5RsCuIzTB_akL=s680-w680-h510",
        City: "Sousse",
        phone_number: 73202000,
        reservation_quota: 20,
        latitude: 35.8425,
        longtitude: 10.6273,
        opening_time: new Date("2019-01-16 12:00:00"),
        closing_time: new Date("2019-01-16 23:00:00"),
        ownerId: 14,
        opening_time: new Date("2019-01-16 08:00:00"),
        closing_time: new Date("2019-01-16 23:00:00"),
        ownerId: 2,
      },
      {
        name: "Dar El Jeld",
        category: ["Tunisian"],
        description:
          "Dar El Jeld Restaurant Set in a beautiful restored traditional medina style house just in front of the hotel offers tunisian meals prepared to the highest strandart.Open noon and evening.Closed on sundays.",
        main_image:
          "https://lh3.googleusercontent.com/p/AF1QipOZSTBFuQzTcMS-zG3Mkvz_iizdNLVaW9j6mX32=s680-w680-h510",
        menu_images: [
          "https://www.jetsetmagazine.net/__admin/__admin_medias/modules/listes/article_1177/diaporama/dareljeled.jpg",
        ],
        extra_images:[
          "https://lh3.googleusercontent.com/p/AF1QipOZSTBFuQzTcMS-zG3Mkvz_iizdNLVaW9j6mX32=s680-w680-h510"  ,
          "https://lh3.googleusercontent.com/p/AF1QipPqv_rUalypNi3EEM1lzRckKuv52fKyJmL62p-R=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipNfVQW8XX5zo9H-4yMD274Rx0EmaA1oe3DKHXj9=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipMA3gdfYPR5FklF9cLlu7XxVDkWpoZcM2HQeo6p=s680-w680-h510",
          ],

        City: "Tunis",
        phone_number: 71560916,
        reservation_quota: 20,
        latitude: 36.799,
        longtitude: 10.1688,
        opening_time: new Date("2019-01-16 12:00:00"),
        closing_time: new Date("2019-01-16 23:00:00"),
        ownerId: 3,
      },
      {
        name: "L'Astragale",
        category: ["French"],
        description:
          "Originally, Astragale was a colonial house in the very chic and popular “French” district of Tunis, its ideal location enjoys exceptional calm and serenity. Today, the restaurant has continued to welcome lovers of taste and pleasure, for moments of happiness and wonder.",
        main_image:
          "https://lh3.googleusercontent.com/geougc/AF1QipNiED2dvZlhswRKnHlu-vsVEyGFAJShDNy4IT3e=w573-h573-p-no",
        menu_images: [
          "https://www.kharjet.tn/wp-content/uploads/2019/03/LAstragale.jpg",
        ],
        extra_images:[
          "https://lh3.googleusercontent.com/geougc/AF1QipNiED2dvZlhswRKnHlu-vsVEyGFAJShDNy4IT3e=w573-h573-p-no"  ,
          "https://lh3.googleusercontent.com/p/AF1QipMm3tijonOu8KHDexGcZ-UvhaTbKw0JE7tx9nqB=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipOkq7ADl1tDUfO7U2o3r9U8lrPyirCteI6LJQh-=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipPnEzefMNodAgpG3aq-r4sg7yQl9PnTJdkDmCry=s680-w680-h510",
          ],
        City: "Tunis",
        phone_number: 71785080,
        reservation_quota: 20,
        latitude: 364929.748,
        longtitude: 101044.616,
        opening_time: new Date("2019-01-16 12:00:00"),
        closing_time: new Date("2019-01-16 01:00:00"),
        ownerId: 16,
        opening_time: new Date("2019-01-16 08:00:00"),
        closing_time: new Date("2019-01-16 01:00:00"),
        ownerId: 4,
      },
      {
        name: "Dar Belhadj",
        category: ["Tunisian"],
        description:
          "Dar Belhadj was once a 17th-century mansion and is decorated in a wonderfully sumptuous manner with beautiful traditional Tunisian mosaic tiles lining the walls. But here is where the grand European gestures come in – the tables are laid with white-linen and the maitre’d greats you in a suit and bow tie to give the restaurant a touch of the fine dining, Tunisian style.",
        main_image:
          "https://media-cdn.tripadvisor.com/media/photo-s/0d/da/4b/14/dar-belhadj.jpg",
        menu_images: [
          "https://www.onamangepourvous.tn/wp-content/uploads/2019/05/LAstragale.jpg",
        ],
        extra_images:[
          "https://media-cdn.tripadvisor.com/media/photo-s/0d/da/4b/14/dar-belhadj.jpg"  ,
          "https://lh3.googleusercontent.com/p/AF1QipMlon-hjp5R8eUze6EVbeeJXjnh90yNhn6plKMU=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipMoq88VZ5LXDX8_blKUzJw3vWLMZs-LTTs3BWlz=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipPGTd9bNhVUCVn6NftuxNUt0ketofTGzqEcXSZe=s680-w680-h510",
          ],
        City: "Tunis",
        phone_number: 71200890,
        reservation_quota: 20,
        latitude: 36.8677,
        longtitude: 10.2887,
        opening_time: new Date("2019-01-16 09:00:00"),
        closing_time: new Date("2019-01-16 01:00:00"),
        ownerId: 5,
      },
      {
        name: "La Villa Bleue",
        category: ["Tunisian"],
        description:
          "In Sidi Bou Said, this bleu and White village, you will discover While you are taking à walk this beautiful traditional wide and residential house built on 1991. Thanks to the famous architect Tarek Ben Miled, it combines Arabic and Andalusian style. The designer Édoardo Palermo created a unique décoration in a fresh contemporary style, chosen to get along with the old ceramic and the authentic materials. Each of the 13 rooms and suites have a magnificent sea view and provide you a perfect balance between tradition and modernity. You will also enjoy the romantic lounge facing the sea and the gourmet restaurant famous for its fine and creative cuisine with International dishes.",
        main_image:
          "https://www.lavillableuesidibousaid.com/wp-content/uploads/2021/06/la-villa-bleue-sidi-bou-said-4410-2.jpg",
        menu_images: [
          "https://10619-2.s.cdn12.com/m9/La-Villa-Restaurant-menu.jpg",
        ],
        extra_images:[
          "https://www.lavillableuesidibousaid.com/wp-content/uploads/2021/06/la-villa-bleue-sidi-bou-said-4410-2.jpg"  ,
          "https://scontent.ftun6-1.fna.fbcdn.net/v/t1.6435-9/117084166_2809544405973941_8762816045655605954_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=810d5f&_nc_ohc=WgXaAEMkCN0AX8nB3-T&_nc_ht=scontent.ftun6-1.fna&oh=00_AfDTgMIhm6u2JQz_e0aovbka2fS78f-XJIfq1Tb2yQFZQg&oe=6571B8B0",
          "https://scontent.ftun6-1.fna.fbcdn.net/v/t39.30808-6/247386590_3133922406869471_2360255971920950813_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qj_ZtB9_S74AX9dOxyd&_nc_ht=scontent.ftun6-1.fna&oh=00_AfCggxjuGT_bjz136qHbo-pxyigEzhoritZIYOWJ90cjXQ&oe=654EEF08",
          "https://scontent.ftun6-1.fna.fbcdn.net/v/t1.6435-9/184314730_3019049611690085_2975595370652846765_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=OWEwyhfpYy4AX9Daza0&_nc_ht=scontent.ftun6-1.fna&oh=00_AfBh5nZOV6rqVGZcrMgCjUl15gV-3YI9AmshpDbmIxo6UQ&oe=6571AF2C",
          ],
        City: "Tunis",
        phone_number: 71742000,
        reservation_quota: 20,
        latitude: 365213.8,
        longtitude: 102107.5,
        opening_time: new Date("2019-01-16 12:00:00"),
        closing_time: new Date("2019-01-16 01:00:00"),
        ownerId: 6,
      },
      {
        name: "Fondouk El Attarine",
        category: ["Tunisian"],
        description:
          "In the heart of the souks, Fondouk el Attarine, Can be privatized in the evening for family or professional receptions.",
        main_image:
          "https://lh3.googleusercontent.com/p/AF1QipMyvh_0MS2d7W6T6OMmbeVM4ntrW99I4MbHiG70=s680-w680-h510",
        menu_images: [
          "https://goutdefood.files.wordpress.com/2015/11/img_6347.jpg?w=584",
        ],
        extra_images:[
          "https://lh3.googleusercontent.com/p/AF1QipMyvh_0MS2d7W6T6OMmbeVM4ntrW99I4MbHiG70=s680-w680-h510"  ,
          "https://lh3.googleusercontent.com/p/AF1QipM5hrys5n-z7NuCIYXyjBLrYB4_X6wapA_0jn2R=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipNurfq_BXySflaZAarZi8aNt-nEdE6Xhx21Rg9B=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipOZC_bBzOLdHn3m-vmSmU_Wzz9E4eizyOT9nykX=s680-w680-h510",
          ],
        City: "Tunis",
        phone_number: 71322244,
        reservation_quota: 20,
        latitude: 36.8677,
        longtitude: 10.2887,
        opening_time: new Date("2019-01-16 12:00:00"),
        closing_time: new Date("2019-01-16 01:00:00"),
        ownerId: 7,
      },
      {
        name: "El Fondouk",
        category: ["Tunisian"],
        description:
          "Unique style and design. An old local-hotel transformed into a modern restaurant.",
        main_image:
          "https://lh3.googleusercontent.com/p/AF1QipN-VHzLRvf5SD06jLuQjnEIMCd4x6DLlquflXMH=s680-w680-h510",
        menu_images: [
          "https://lh3.googleusercontent.com/p/AF1QipPuyPAR7uF5JQUCziXrsRBibhQISANjjyKvcRQd=s680-w680-h510",
        ],
        extra_images:[
          "https://lh3.googleusercontent.com/p/AF1QipN-VHzLRvf5SD06jLuQjnEIMCd4x6DLlquflXMH=s680-w680-h510"  ,
          "https://lh3.googleusercontent.com/p/AF1QipPOi82wRLInx9yBX0Ym4Xpm47xFTRjrKJTBf6Kh=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipOx2adqMx4WdHSw8CAj49e4cyHhyFKD4snDJJ9V=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipOw9GZ3VDzjLTtPXcZK-0mBnbPDqLOLdRE8OMSv=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipP5IEh0G4LkH81L3jk5eR4Dn9X4wqd6OiJzo8wN=s680-w680-h510",
          ],
        City: "Djerba",
        phone_number: 28988276,
        reservation_quota: 20,
        latitude: 33.8777,
        longtitude: 10.8591,
        opening_time: new Date("2019-01-16 12:00:00"),
        closing_time: new Date("2019-01-16 23:00:00"),
        ownerId: 8,
      },
      {
        name: "Farmers",
        category: ["Steakhouse"],
        description:
          "A classic steakhouse known for its premium cuts of meat, expertly grilled to perfection, and complemented by a selection of fine wines and indulgent sides.",
        main_image:
          "https://lh3.googleusercontent.com/p/AF1QipOHEWzT-R4B4AEWpAhKlkt8a6wxqm_ggFuWoxse=s680-w680-h510",
        menu_images: [
          "https://lh3.googleusercontent.com/p/AF1QipOCzr-R6LMCFFsxc_xr_0dcNWLhvRivzDRw32hz=s680-w680-h510",
        ],
        extra_images:[
          "https://lh3.googleusercontent.com/p/AF1QipOHEWzT-R4B4AEWpAhKlkt8a6wxqm_ggFuWoxse=s680-w680-h510"  ,
          "https://lh3.googleusercontent.com/p/AF1QipPaFnaDPW76txbx7mtgMBhKxt4Jhy5PscfLtIfk=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipPh_ezJrwEu21n2FNdaje2GhG5FhvFXL6OeB39e=s680-w680-h510",
      
          ],
        City: "Sousse",
        phone_number: 20155733,
        reservation_quota: 20,
        latitude: 35.8515,
        longtitude: 10.6153,
        opening_time: new Date("2019-01-16 20:00:00"),
        closing_time: new Date("2019-01-16 00:00:00"),
        ownerId: 9,
      },
      {
        name: "L'AROMATE",
        category: ["Italian"],
        description:
          "L'aromate is Restaurant Pizzeria, in an exceptional modern and refined setting. A must have in Sousse to enjoy succulent dishes from time to time.",
        main_image:
          "https://lh3.googleusercontent.com/p/AF1QipM-iXXnrQVgS8BFbasa04McoayUdUfxiRoT8rhO=s680-w680-h510",
        menu_images: [
          "https://www.kharjet.tn/wp-content/uploads/2019/12/LAromate-Restaurant-Pizzeria-menu-5.jpg",
        ],
        extra_images:[
          "https://lh3.googleusercontent.com/p/AF1QipM-iXXnrQVgS8BFbasa04McoayUdUfxiRoT8rhO=s680-w680-h510"  ,
          "https://lh3.googleusercontent.com/p/AF1QipMeWdz1-KrfMgR-nJEjPcTobbxjTDd_HP82wyie=s680-w680-h510",
          "https://lh3.googleusercontent.com/p/AF1QipPh5cIGxXssTNG1HRV9gUaWEoczCLZw2EXwofTB=s680-w680-h510",
         
          ],
        City: "Sousse",
        phone_number: 23732731,
        reservation_quota: 20,
        latitude: 35.8399,
        longtitude: 10.6033,
        opening_time: new Date("2019-01-16 21:00:00"),
        closing_time: new Date("2019-01-16 00:00:00"),
        ownerId: 10,
      },
      {
        name: "Le Pirate",
        category: ["Tunisian"],
        description:
          "All visitors love the superb Tunisian cuisine of this restaurant. Here where you can  eat tasty shrimps at Le Pirate.",
        main_image:
          "https://lh3.googleusercontent.com/p/AF1QipOZn1A4VZDRSg0RXYhPDonDAMiYdmWJekMzOBfM=s680-w680-h510",
        menu_images: [
          "https://lh3.googleusercontent.com/p/AF1QipOynfMjD74ka9CHzLHy_NbvXtIwj31v6g48azTp=s680-w680-h510",
        ],
        extra_images:[
          "https://lh3.googleusercontent.com/p/AF1QipOZn1A4VZDRSg0RXYhPDonDAMiYdmWJekMzOBfM=s680-w680-h510"  ,
          "https://lh3.googleusercontent.com/p/AF1QipPPGeVzs4TFWVSWAe0aXnpZtCCdZIOMrsFOSvpD=s680-w680-h510",
         
          ],
        City: "Djerba",
        phone_number: 73468126,
        reservation_quota: 20,
        latitude: 35.7602,
        longtitude: 10.8386,
        opening_time: new Date("2019-01-16 21:00:00"),
        closing_time: new Date("2019-01-16 00:00:00"),
        ownerId: 11,
      },
      {
        name: "Sushi&Co",
        category: ["Japanese"],
        description:
          "The restaurants offer specialties from the modern Japanese, Thai and Chinese cuisines as well as highly professional catering services and qualities.",
        main_image:
          "https://i.pinimg.com/originals/45/39/12/45391276436556adda14a800ea4df9df.jpg",
        menu_images: [
          "https://www.restorani.com.mk/storage/images/restaurants/menu/%D0%A0%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%20%D0%A1%D1%83%D1%88%D0%B8%D0%BA%D0%BE_1551348631_en_photo.jpg",
        ],
        extra_images:[
          "https://i.pinimg.com/originals/45/39/12/45391276436556adda14a800ea4df9df.jpg"  ,
          "https://lh3.googleusercontent.com/p/AF1QipOrSxWbsDI1J7HJyx10p8JDkI1Tn2KVzVPiWHxT=s680-w680-h510",
          
          ],
        City: "Nabel",
        phone_number: 29250150,
        reservation_quota: 20,
        latitude: 362721.82,
        longtitude: 104415.47,
        opening_time: new Date("2019-01-16 13:00:00"),
        closing_time: new Date("2019-01-16 22:00:00"),
        ownerId: 24,
        opening_time: new Date("2019-01-16 08:00:00"),
        closing_time: new Date("2019-01-16 01:00:00"),
        ownerId: 12,
      },
    ],
  });
};
const createOwner = async () => {
  await prisma.user.createMany({
    data: [
      {
        fullname: "Hamadi Labyedh",
        email: "Labyedh@gmail.com",
        password: "1234",
        role: "OWNER",
      },
      {
        fullname: "Mayssa allani",
        email: "Alani@gmail.com",
        password: "1234789",
        role: "OWNER",
      },
      {
        fullname: "Hazem Lahmer",
        email: "hazem@gmail.com",
        password: "123489",
        role: "OWNER",
      },
      {
        fullname: "salim Brahem ",
        email: "Brahem@gmail.com",
        password: "12388",
        role: "OWNER",
      },
      {
        fullname: "Mohamed Chiha",
        email: "chiha@gmail.com",
        password: "12389",
        role: "OWNER",
      },
      {
        fullname: "Ahmed Fersi",
        email: "fersi@gmail.com",
        password: "1234",
        role: "OWNER",
      },
      {
        fullname: "Adam Didoo",
        email: "didoo@gmail.com",
        password: "123336",
        role: "OWNER",
      },
      {
        fullname: "Michelle Choi",
        email: "choi@gmail.com",
        password: "12336",
        role: "OWNER",
      },
      {
        fullname: "Kelly Wakasa",
        email: "kelly@gmail.com",
        password: "3336",
        role: "OWNER",
      },
      {
        fullname: "hela jlassi",
        email: "mayssa@gmail.com",
        password: "1236",
        role: "OWNER",
      },
      {
        fullname: "yossra selmi",
        email: "selmi@gmail.com",
        password: "1233444",
        role: "OWNER",
      },
      {
        fullname: "Nejya Farhat",
        email: "nejya@gmail.com",
        password: "123884",
        role: "OWNER",
      },
    ],
  });
};


  

// createOwner();
createMany();


