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
        ],

        phone_number: 70938537,
        reservation_quota: 20,
        latitude: 36.8677,
        longtitude: 10.2887,
        opening_time: new Date("2019-01-16 08:00:00"),
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
        main_image:
          "https://lh3.googleusercontent.com/p/AF1QipMgNYBBgxa3453Akv7EGDeYgnA5RsCuIzTB_akL=s680-w680-h510",
        phone_number: 73202000,
        reservation_quota: 20,
        latitude: 35.8425,
        longtitude: 10.6273,
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
        phone_number: 71560916,
        reservation_quota: 20,
        latitude: 36.799,
        longtitude: 10.1688,
        opening_time: new Date("2019-01-16 08:00:00"),
        closing_time: new Date("2019-01-16 23:00:00"),
        ownerId: 3,
      },
      {
        name: "L'Astragale",
        category: ["French"],
        description:
          "Originally, Astragale was a colonial house in the very chic and popular “French” district of Tunis, its ideal location enjoys exceptional calm and serenity. Today, the restaurant has continued to welcome lovers of taste and pleasure, for moments of happiness and wonder.",
        main_image:
          " https://lh3.googleusercontent.com/geougc/AF1QipNiED2dvZlhswRKnHlu-vsVEyGFAJShDNy4IT3e=w573-h573-p-no",
        menu_images: ["https://www.kharjet.tn/wp-content/uploads/2019/03/LAstragale.jpg"],
        phone_number: 71785080,
        reservation_quota: 20,
        latitude: 364929.748,
        longtitude: 101044.616,
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
        category: ["Steakhouse"],
        description:
          "In Sidi Bou Said, this bleu and White village, you will discover While you are taking à walk this beautiful traditional wide and residential house built on 1991. Thanks to the famous architect Tarek Ben Miled, it combines Arabic and Andalusian style. The designer Édoardo Palermo created a unique décoration in a fresh contemporary style, chosen to get along with the old ceramic and the authentic materials. Each of the 13 rooms and suites have a magnificent sea view and provide you a perfect balance between tradition and modernity. You will also enjoy the romantic lounge facing the sea and the gourmet restaurant famous for its fine and creative cuisine with International dishes.",
        main_image:
          "https://www.lavillableuesidibousaid.com/wp-content/uploads/2021/06/la-villa-bleue-sidi-bou-said-4410-2.jpg",
        menu_images: [
          "https://10619-2.s.cdn12.com/m9/La-Villa-Restaurant-menu.jpg",
        ],
        phone_number: 71742000,
        reservation_quota: 20,
        latitude: 365213.8,
        longtitude: 102107.5,
        opening_time: new Date("2019-01-16 08:00:00"),
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
        phone_number: 71322244,
        reservation_quota: 20,
        latitude: 36.8677,
        longtitude: 10.2887,
        opening_time: new Date("2019-01-16 08:00:00"),
        closing_time: new Date("2019-01-16 01:00:00"),
        ownerId: 7,
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
    ],
  });
};

createOwner()
createMany();
