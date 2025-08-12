import { HomeButtonGroup } from "./components/button-group";
import HomeCategoryList from "./components/category-list";

import { HomeFinancialLists } from "./components/financial-lists";
import { HomeGoalCards } from "./components/goal-cards";
import { HomeNewRelease } from "./components/new-release";
import { HomeResultsGraph } from "./components/results-graph";
import { HomeTransactions } from "./components/transactions";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-2 pb-20 xl:gap-4 xl:pb-0">
      <span className="text-lg font-semibold xl:text-xl">
        Bem vindo Geovane
      </span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <HomeButtonGroup />
        </div>
        <div className="col-span-12 flex items-end justify-end">
          <HomeNewRelease />
        </div>
        <div className="col-span-12 rounded-xl border border-zinc-200 p-2 shadow-sm xl:col-span-7 xl:p-4">
          <HomeResultsGraph />
        </div>
        <div className="col-span-12 rounded-xl border border-zinc-200 shadow-sm xl:col-span-5">
          <HomeCategoryList />
        </div>
        <div className="col-span-12">
          <HomeGoalCards />
        </div>
        <div className="col-span-12">
          <HomeFinancialLists />
        </div>
        {/* <div className="col-span-12">
                  <PayableTransactions />
                </div> */}
        <div className="col-span-12">
          <HomeTransactions />
        </div>
      </div>
    </div>
  );
}
