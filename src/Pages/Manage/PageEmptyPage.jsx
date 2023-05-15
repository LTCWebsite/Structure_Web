import React from "react";
import iconEmpty from "../../Image/IconEmpty.svg"

export default function PageEmptyPage() {
  return (
    <>
      <div style={{display:'flex', justifyContent:'center',width:'100%',marginTop:'5rem'}}>
      <img src={iconEmpty} alt="" />
      </div>
      <h2 style={{textAlign:'center', width:'100%', color:'#c4c4c4', fontSize:'1.3rem'}}>
        ຂໍອະໄພ, ບໍ່ພົບຂໍ້ມູນດັ່ງກ່າວໃນລະບົບ.
      </h2>
    </>
  );
}
