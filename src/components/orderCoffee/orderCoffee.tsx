import React, { useState } from "react";
import Bubble from "../bubble/bubble";
import CoffeeMenu from "../coffeeMenu/coffeeMenu";
import SayingStaff from "../sayingStaff/sayingStaff";
import styles from "./orderCoffee.module.css";
import iceCoffee from "../../common/images/iceCoffee.png";

interface Props {
  receiveOrder(coffee: object): void;
}
function OrderCoffee({ receiveOrder }: Props) {
  const [coffee, setCoffee] = useState("");
  const [ice, setIce] = useState(false);
  const [shot, setShot] = useState(1);
  const [sirup, setSirup] = useState(0);
  const [order, setOrder] = useState<CoffeeOrder>();
  function selectCoffee(coffee: string) {
    setCoffee(coffee);
  }
  function isIce() {
    setIce(!ice);
  }
  function addShot(num: number) {
    if (!(shot == 1 && num == -1)) {
      setShot(shot + num);
    }
  }
  function addSirup(num: number) {
    if (!(sirup == 0 && num == -1)) {
      setSirup(sirup + num);
    }
  }
  function selectOption() {
    setOrder({ coffee, shot, sirup, ice });
  }
  function retry() {
    setOrder(undefined);
  }
  function orderCoffee() {
    receiveOrder({ coffee, shot, sirup, ice });
  }
  return (
    <div className={styles.container}>
      <div className={styles.staff}>
        <SayingStaff
          text={
            coffee === ""
              ? `안녕하세요~ Cafe입니다.\n메뉴보고 주문해주세요^^`
              : order === undefined
              ? `${coffee} 주문받았습니다. \n 옵션을 선택해주세요~`
              : `${coffee} 샷${shot}개 시럽${sirup}번 ${
                  ice ? "Ice로" : "Hot으로"
                }\n 주문하시겠어요?`
          }
        />
      </div>
      {coffee === "" ? (
        <div className={styles.menu}>
          <CoffeeMenu selectCoffee={selectCoffee} />
        </div>
      ) : order === undefined ? (
        <Bubble
          text={
            <div>
              <ul className={styles.options}>
                <li className={styles.option}>
                  <p>아이스</p>
                  <button
                    className={ice ? styles.ice_btn_clicked : styles.ice_btn}
                    onClick={isIce}
                  >
                    <img className={styles.ice} src={iceCoffee} />
                  </button>
                </li>
                <li className={styles.option}>
                  <p>샷</p>
                  <div>
                    <button
                      className={`${styles.ctrl} ${styles.minus}`}
                      onClick={() => addShot(-1)}
                    >
                      -
                    </button>
                    {shot}
                    <button
                      className={`${styles.ctrl} ${styles.plus}`}
                      onClick={() => addShot(1)}
                    >
                      +
                    </button>
                  </div>
                </li>
                <li className={styles.option}>
                  <p>시럽</p>
                  <div>
                    <button
                      className={`${styles.ctrl} ${styles.minus}`}
                      onClick={() => addSirup(-1)}
                    >
                      -
                    </button>
                    {sirup}
                    <button
                      className={`${styles.ctrl} ${styles.plus}`}
                      onClick={() => addSirup(1)}
                    >
                      +
                    </button>
                  </div>
                </li>
                <li className={`${styles.option} ${styles.select}`}>
                  <button className={styles.select_btn} onClick={selectOption}>
                    선택완료
                  </button>
                </li>
              </ul>
            </div>
          }
        />
      ) : (
        <Bubble
          text={
            <div>
              <button
                className={`${styles.order_btn} ${styles.yes}`}
                onClick={orderCoffee}
              >
                네
              </button>
              <button
                className={`${styles.order_btn} ${styles.retry}`}
                onClick={retry}
              >
                다시추가할래요
              </button>
            </div>
          }
        />
      )}
    </div>
  );
}

export default OrderCoffee;