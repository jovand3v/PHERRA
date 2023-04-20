import s from "./CollectionModal.module.scss";
import PlusIcon from "@public/assets/icons/plus-thin.svg";
import { ChangeEvent, useState } from "react";
import ExitIcon from "@public/assets/icons/x.svg";
import AdminDashboardAddProductStock from "./CollectionModalStock";

const CollectionModal = () => {
  const [img, setImg] = useState<string | null>(null);

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = () => {
        if (!reader.result) return;
        setImg(typeof reader.result === "string" ? reader.result : Buffer.from(reader.result).toString());
      };
    }
  };

  return (
    <div className={s.main}>
      <div className={s.overlay}></div>
      <div className={s.modal}>
        <header className={s.header}>
          <h4 className={s.title}>ADD PRODUCT</h4>
          <p className={s.subtitle}>ALL FIELDS ARE MANDATORY</p>
        </header>
        <div className={s.form}>
          <div className={s.formLeft}>
            <div className={s.inputsContainer}>
              <label className={`${s.inputLabel} ${s.inputLabelName}`}>
                NAME
                <input className={`${s.input} ${s.inputName}`} placeholder="Enter product name" />
              </label>
              <label className={s.inputLabel}>
                PRICE
                <input className={`${s.input} ${s.inputPrice}`} placeholder="100" />
              </label>
              <label className={s.inputLabel}>
                DISCOUNT
                <input className={`${s.input} ${s.inputDiscount}`} placeholder="10" />
              </label>
            </div>
            <AdminDashboardAddProductStock />
            <button className={s.button}>ADD PRODUCT</button>
          </div>
          <div className={s.imgContainer}>
            <label className={`${s.inputLabel} ${s.inputLabelImg}`}>
              IMAGE
              <div className={s.inputImgContainer}>
                {img ? <img src={img} alt="" className={s.img} /> : <PlusIcon className={s.plusIcon} />}
                <input type="file" className={`${s.input} ${s.inputImg}`} onChange={(e) => handleImagePreview(e)} />
              </div>
            </label>
          </div>
        </div>
        <ExitIcon className={s.exit} />
      </div>
    </div>
  );
};

export default CollectionModal;
