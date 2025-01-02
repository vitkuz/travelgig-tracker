'use client'
import {LanguageProvider} from "@/i18n/context";
import {JobProvider} from "@/context/JobContext";
import {FilterProvider} from "@/context/FilterContext";
import HomePageContent from "@/component/HomePageContent";

export default function Home() {
  return (
      <LanguageProvider>
        <JobProvider>
          <FilterProvider>
            <HomePageContent/>
          </FilterProvider>
        </JobProvider>
      </LanguageProvider>
  );
}
