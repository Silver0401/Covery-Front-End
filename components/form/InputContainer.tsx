import React, { useState } from "react";
import styles from "../../styles/scss/modules.module.scss";

interface InputContainerProps {
  placeholder: string | undefined;
}

const InputContainer: React.FC<InputContainerProps> = ({ placeholder }) => {
  const [value, setValue] = useState<string>();

  return (
    <div className={styles.spaceItemsVertical}>
      <h4>{placeholder}</h4>
    </div>
  );
};

export default InputContainer;
