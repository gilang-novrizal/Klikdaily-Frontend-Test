import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Label,
  Pane,
  PlusIcon,
  Select,
  Text,
  Textarea,
  TextInput,
} from "evergreen-ui";
import { data } from "../data/data";

const FormPages = () => {
  const [employeeData, setEmployeeData] = useState([
    {
      id: 1,
      employee_name: "Tiger Nixon",
      employee_salary: 320800,
      employee_age: 61,
      profile_image: "",
    },
    {
      id: 2,
      employee_name: "Tiger Nixon",
      employee_salary: 320800,
      employee_age: 61,
      profile_image: "",
    },
    {
      id: 3,
      employee_name: "Tiger Nixon",
      employee_salary: 320800,
      employee_age: 61,
      profile_image: "",
    },
    {
      id: 4,
      employee_name: "Tiger Nixon",
      employee_salary: 320800,
      employee_age: 61,
      profile_image: "",
    },
    {
      id: 5,
      employee_name: "Tiger Nixon",
      employee_salary: 320800,
      employee_age: 61,
      profile_image: "",
    },
  ]);
  const [name, setName] = useState("");
  const [distCenter, setDistCenter] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [expDate, setExpDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [disableConfirm, setDisableConfirm] = useState(true);
  const [productItem, setProductItem] = useState([
    {
      name: "",
      unit: "",
      qty: null,
      price: null,
      total: null,
    },
  ]);

  //   const fetchData = () => {
  //     axios
  //       .get("http://dummy.restapiexample.com/api/v1/employees")
  //       .then((res) => setEmployeeData(res.data.data))
  //       .catch((err) => console.log(err));
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  useEffect(() => {
    setDisableConfirm(checkDisableConfirm());
  }, [name, distCenter, paymentType, expDate, productItem]);

  const handleAddItem = () => {
    let productArr = [...productItem];
    productArr.push({
      name: "",
      unit: "",
      qty: null,
      price: null,
      total: null,
    });
    setProductItem(productArr);
  };
  const handleEditProduct = (props, index, value) => {
    setProductItem([...productItem], (productItem[index][props] = value));
    if (props === "name") {
      setProductItem(
        [...productItem],
        ((productItem[index].unit = ""),
        (productItem[index].qty = 0),
        (productItem[index].price = 0),
        (productItem[index].total = 0))
      );
    }
    if (props === "unit") {
      let price;
      data.products.map((p) => {
        if (p.product_name === productItem[index].name) {
          p.units.map((pu) => {
            if (pu.name === value) {
              price = pu.price;
            }
          });
        }
      });
      setProductItem([...productItem], (productItem[index].price = price));
    }
    if (props === "qty") {
      setProductItem(
        [...productItem],
        (productItem[index].total = value * productItem[index].price)
      );
      const total = productItem.reduce((a, b) => a.total + b.total);
      if (productItem.length > 1) {
        setTotalPrice(total);
      } else {
        setTotalPrice(value * productItem[index].price);
      }
    }
  };
  const checkDisableConfirm = () => {
    let productValid = true;

    productItem.map((p) => {
      for (let key in p) {
        if (p[key] === "" || p[key] === null || p[key] === 0) {
          productValid = false;
        }
      }
    });

    if (
      name !== "" &&
      distCenter !== "" &&
      paymentType !== "" &&
      expDate !== "" &&
      productValid
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="container">
      <Text fontSize="20px" fontWeight="bold">
        Create Order
      </Text>
      <Pane className="formContainer">
        <Pane className="label">
          <Text>Detail</Text>
        </Pane>
        <Pane className="inputContainer">
          <Pane className="inputWrapper">
            <Label>
              Name<span className="required">*</span>
            </Label>
            <Select
              width={200}
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              <option value="" disabled>
                Name
              </option>
              {employeeData?.map((em) => {
                return (
                  <option value={em.employee_name}>{em.employee_name}</option>
                );
              })}
            </Select>
          </Pane>
          <Pane className="inputWrapper">
            <Label>
              Distribution Center<span className="required">*</span>
            </Label>
            <Select
              width={200}
              name="distribution"
              value={distCenter}
              onChange={(e) => setDistCenter(e.target.value)}
            >
              {name === "" ? (
                <option value="">No Data Available</option>
              ) : (
                <>
                  <option value="" disabled>
                    Distribution Center
                  </option>
                  {data.distributionCenter?.map((dc) => {
                    return <option value={dc.value}>{dc.name}</option>;
                  })}
                </>
              )}
            </Select>
          </Pane>
          {name !== "" && distCenter !== "" && (
            <>
              <Pane display="flex">
                <Pane className="inputWrapper" marginRight="2rem">
                  <Label>
                    Payment Type<span className="required">*</span>
                  </Label>
                  <Select
                    name="payment"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Payment Type
                    </option>
                    {data.paymentType?.map((pt) => {
                      return <option value={pt.value}>{pt.name}</option>;
                    })}
                  </Select>
                </Pane>
                <Pane className="inputWrapper">
                  <Label>
                    Expiration Date<span className="required">*</span>
                  </Label>
                  <input
                    className="dateInput"
                    type="date"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                  />
                </Pane>
              </Pane>
              <Pane className="inputWrapper">
                <Label>Notes</Label>
                <Textarea />
              </Pane>
            </>
          )}
        </Pane>
      </Pane>
      <Pane className="divider"></Pane>
      {name !== "" && distCenter !== "" && (
        <Pane className="formContainer">
          <Pane className="label">
            <Text>Product</Text>
          </Pane>

          <Pane className="inputContainer">
            {productItem?.map((product, index) => {
              return (
                <Pane marginBottom="2rem">
                  <Pane display="flex" justifyContent="space-between">
                    <Pane className="inputWrapper" width="70%">
                      <Label>
                        Product<span className="required">*</span>
                      </Label>
                      <Select
                        name="name"
                        value={product.name}
                        onChange={(e) =>
                          handleEditProduct("name", index, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Product Name
                        </option>
                        {data.products?.map((pr) => {
                          return (
                            <option value={pr.product_name}>
                              {pr.product_name}
                            </option>
                          );
                        })}
                      </Select>
                    </Pane>
                    <Pane className="inputWrapper" width="25%">
                      <Label>
                        Unit<span className="required">*</span>
                      </Label>
                      <Select
                        name="unit"
                        value={product.unit}
                        onChange={(e) =>
                          handleEditProduct("unit", index, e.target.value)
                        }
                      >
                        {product.name === "" ? (
                          <option value="">No Data Available</option>
                        ) : (
                          <>
                            <option value="" disabled>
                              Unit
                            </option>
                            {data.products?.map((pr) => {
                              if (pr.product_name === product.name) {
                                return pr.units.map((pu) => {
                                  return (
                                    <option value={pu.name}>{pu.name}</option>
                                  );
                                });
                              }
                            })}
                          </>
                        )}
                      </Select>
                    </Pane>
                  </Pane>

                  <Pane
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Pane className="inputWrapper" width="25%">
                      <Label>
                        Quantity<span className="required">*</span>
                      </Label>
                      <TextInput
                        width="100%"
                        value={product.qty}
                        onChange={(e) =>
                          handleEditProduct("qty", index, e.target.value)
                        }
                      />
                    </Pane>
                    <Pane className="inputWrapper" width="25%">
                      <Label>
                        Price<span className="required">*</span>
                      </Label>
                      <TextInput
                        type="numbers"
                        width="100%"
                        value={product.price}
                      />
                    </Pane>
                    <Pane className="inputWrapper" width="40%">
                      <Label>
                        Total Price<span className="required">*</span>
                      </Label>
                      <TextInput
                        type="numbers"
                        width="100%"
                        disabled
                        value={product.total}
                      />
                    </Pane>
                  </Pane>

                  <Pane display="flex" justifyContent="flex-end">
                    <Pane
                      width="50%"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Text fontWeight="bold">Total Nett Price</Text>
                      <Text fontWeight="bold">
                        {product.total?.toLocaleString()}
                      </Text>
                    </Pane>
                  </Pane>
                  <Button
                    appearance="primary"
                    intent="warning"
                    iconAfter={PlusIcon}
                    marginTop="2rem"
                    width="150px"
                    onClick={handleAddItem}
                  >
                    New Item
                  </Button>
                </Pane>
              );
            })}
            <Pane display="flex" justifyContent="flex-end">
              <Pane width="50%" display="flex" justifyContent="space-between">
                <Text fontWeight="bold" fontSize="18px">
                  Total Price
                </Text>
                <Text fontWeight="bold" fontSize="18px">
                  {totalPrice.toLocaleString()}
                </Text>
              </Pane>
            </Pane>
          </Pane>
          <Pane className="divider"></Pane>
        </Pane>
      )}
      <Pane display="flex" justifyContent="flex-end" marginTop="2rem">
        <Button marginRight="1rem">Cancel</Button>
        <Button appearance="primary" intent="success" disabled={disableConfirm}>
          Confirm
        </Button>
      </Pane>
    </div>
  );
};

export default FormPages;
