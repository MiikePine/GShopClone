import { getFetchUrl } from "@/lib/getFetchUrl";
import { PageResult, SearchParams } from "@/typings";
import { redirect } from 'next/navigation';

type Props = {
  searchParams: SearchParams;
  params: {
    term: string;
  };
};

async function SearchPage({ searchParams, params: { term } }: Props) {
  if (!term) {
    redirect("/");
  }


  
  const response = await fetch(getFetchUrl("api/search"), {
    method: "POST",
    body: JSON.stringify({ searchTerm: term, ...searchParams }),
  });

  const results = (await response.json()) as PageResult[];
  console.log(results);

  return (
    <div>
      {/* results list */}
    </div>
  );
}

export default SearchPage;
