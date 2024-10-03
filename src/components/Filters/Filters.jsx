import { useState } from "react";
import Button from "../Button/Button";
import LocationInput from "../LocationInput/LocationInput";
import EquipmentFilter from "../EquipmentFilter/EquipmentFilter";
import VehicleTypeFilter from "../VehicleTypeFilter/VehicleTypeFilter";
import styles from "./Filters.module.css";

const Filters = ({ onFilterChange }) => {
  const [location, setLocation] = useState("");
  const [form, setForm] = useState("");
  const [equipment, setEquipment] = useState([]);

  const applyFilters = () => {
    onFilterChange({ location, form, equipment });
  };

  return (
    <>
      <div className={styles.filters}>
        <LocationInput value={location} onChange={setLocation} />

        <h2 className={styles.filtersTitle}>Filters</h2>

        <EquipmentFilter
          selectedEquipment={equipment}
          onEquipmentChange={setEquipment}
        />

        <VehicleTypeFilter selectedType={form} onTypeChange={setForm} />
      </div>
      <Button onClick={applyFilters} className={styles.applyButton}>
        Apply Filters
      </Button>
    </>
  );
};

export default Filters;
