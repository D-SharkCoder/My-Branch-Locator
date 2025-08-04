import './../App.css';
import BranchGridSection from '../components/BranchGridSection';
import SearchSection from '../components/SearchSection';
import BranchListContextProvider from '../contexts/branch-listing-context';
import BranchModal from '../components/BranchModal';
import LocationModal from '../components/LocationModal';

function BranchLocator() {

  return (
    <div>
        <BranchListContextProvider>
          <SearchSection/>
          <BranchGridSection/>
          <BranchModal/>
          <LocationModal/>
        </BranchListContextProvider>
    </div>
  );
}

export default BranchLocator;
