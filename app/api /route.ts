// import {SearchParams, PageResult} from "@/typings"
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//     const {searchTerm, pages, ...params} = await request.json();
//     const searchParams: SearchParams = params;

//     if (!searchTerm) {
//         return NextResponse.next(
//             new Response ("Missing search term" , {
//                 status: 400,
//             })
//         );  
//     }


//     const urlString = 'https://realtime.oxylabs.io/v1/queries';
//     const url = new URL(urlString);
//     const username = 'YOUR_USERNAME';
//     const password = 'YOUR_PASSWORD';
//     const body = {
//       'source': 'google_shopping_product',
//       'domain': 'com',
//       'query': '5007040952399054528'
//     };
  
    


//  const filters : any = [];   

// Object.entries(searchParams).forEach(([key, value]) => {
//     if (value) {
//         if (key == "max_price") {
//             if ((value = "1000+")) return;
//         }

//         filters.push({
//             key,
//             value: key === "sort_by" ? value : Number(value),
//           });
//        }
//   });

//   const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Basic ${Buffer.from(
//             process.env.OXYLABS_USERNAME + ":" + process.env.OXYLABS_PASSWORD
//         ).toString("base64")}`,
//     },
//     cache: 'no-store',
//     body: JSON.stringify({
//         source: "google_shopping_product", 
//         domain: "com", 
//         query: searchTerm,
//         pages: Number(pages) || 1,
//         parse: true, 
//         context : filters,
//     }
   
//     )    

// })

// const contentType = response.headers.get("Content-Type");
// console.log(contentType);

// const data = await response.json();
// console.log(data);
// const pageResults: PageResult[] = data.results;

// return NextResponse.json(pageResults)

// }



import { SearchParams, PageResult } from "@/typings";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { searchTerm, pages, ...params } = await request.json();
    const searchParams: SearchParams = params;

    if (!searchTerm) {
      return NextResponse.next(
        new Response("Missing search term", {
          status: 400,
        })
      );
    }

    const urlString = "https://realtime.oxylabs.io/v1/queries";
    const url = new URL(urlString);
    const username = "YOUR_USERNAME";
    const password = "YOUR_PASSWORD";
    const body = {
      source: "google_shopping_product",
      domain: "com",
      query: "5007040952399054528",
    };

    const filters: any = [];

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        if (key === "max_price") {
          if ((value = "1000+")) return;
        }

        filters.push({
          key,
          value: key === "sort_by" ? value : Number(value),
        });
      }
    });

    const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          process.env.OXYLABS_USERNAME + ":" + process.env.OXYLABS_PASSWORD
        ).toString("base64")}`,
      },
      cache: "no-store",
      body: JSON.stringify({
        source: "google_shopping_product",
        domain: "com",
        query: searchTerm,
        pages: Number(pages) || 1,
        parse: true,
        context: filters,
      }),
    });

    const contentType = response.headers.get("Content-Type");
    console.log(contentType);

    const data = await response.json();
    console.log(data);
    const pageResults: PageResult[] = data.results;

    return NextResponse.json(pageResults);
  } catch (error) {
    console.error(error);
    return NextResponse.next(
      new Response("Internal Server Error", {
        status: 500,
      })
    );
  }
}
