import React, { useRef, useState } from "react";
import "../index.css";
import DummyDetails from "./Dummy/DummyDetails";
import styled from "styled-components";
import { BsPrinter } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import avocado from "../assests/Avocado.jpg";
import {
  Button,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem, updateStatus } from "../redux/dataFunctions";

function ShowItems() {
  const [AddFormData, setAddFormData] = useState({});
  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();
  const {
    isOpen: isOpenMessageModal,
    onOpen: onOpenMessageModal,
    onClose: onCloseMessageModal,
  } = useDisclosure();
  const currentId = useRef();
  const items = useSelector((store) => store.items);
  const dispatch = useDispatch();
  const [editdata, setEditdata] = useState({});

  return (
    <div style={{ margin: "20px 5px 5px 5px"}}>
      <DummyDetails />
      <ItemWrapper>
        <div>
          <input type="search" placeholder="Search..." />
          <div>
            <button onClick={onOpenAddModal}>Add item</button>
            <BsPrinter color="#1e633f" size={"30px"} />
          </div>
        </div>
        <TableContainer
          marginTop={"20px"}
          borderTopRadius={"20px"}
          borderTop={"2px solid lightgray"}
        >
          <Table variant="simple">
            <Thead>
              <Tr border={"2px solid lightgray"} borderTop={"none"}>
                <Th></Th>
                <Th>Product name</Th>
                <Th>Brand</Th>
                <Th isNumeric>Price</Th>
                <Th>Quantity</Th>
                <Th>Total</Th>
                <Th>Status</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((el) => (
                <Tr key={el._id}>
                  <Img src={avocado} height={"50px"} />
                  <Td>
                    {el.name.length > 30
                      ? el.name.slice(0, 30) + "..."
                      : el.name}
                  </Td>
                  <Td>{el.brand}</Td>
                  <Td isNumeric>
                    {el.price > 0 ? "$" : ""}
                    {el.price}
                  </Td>
                  <Td textAlign={"center"}>{el.quantity}</Td>
                  <Td>
                    {el.quantity * el.price > 0 ? "$" : ""}
                    {el.quantity * el.price}
                  </Td>
                  <Td>
                    <span className={el.status ? el.status : "NoStatus"}>
                      {el.status}
                    </span>
                  </Td>
                  <Td>
                    <BtnWrapper>
                      <button
                        title="Approve"
                        onClick={() =>
                          dispatch(updateStatus(el._id, "Approved"))
                        }
                      >
                        <FaCheck
                          size={"20px"}
                          color={
                            !el.status.includes("Missing")&& el.status!=="" ? "green" : "lightgray"
                          }
                        />
                      </button>
                      <button
                        title="Missing"
                        onClick={() => {
                          currentId.current = el;
                          onOpenMessageModal();
                        }}
                      >
                        <ImCross
                          color={
                            el.status.includes("Missing") ? "red" : "lightgray"
                          }
                        />
                      </button>
                      <button
                        onClick={() => {
                          setEditdata(
                            items.filter((item) => item._id == el._id)[0]
                          );
                          onOpenEditModal();
                        }}
                      >
                        Edit
                      </button>
                    </BtnWrapper>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </ItemWrapper>

      {/* modals  */}

      {/* add items modal */}
      <Modal isCentered isOpen={isOpenAddModal} onClose={onCloseAddModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label htmlFor="name">Name: </label>
            <Input
              type="text"
              id="name"
              onChange={(e) =>
                setAddFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <label htmlFor="brand">Brand :</label>
            <Input
              type="text"
              id="brand"
              onChange={(e) =>
                setAddFormData((prev) => ({ ...prev, brand: e.target.value }))
              }
            />
            <label htmlFor="price">Price :</label>
            <Input
              type="number"
              id="price"
              onChange={(e) =>
                setAddFormData((prev) => ({ ...prev, price: e.target.value }))
              }
            />
            <label htmlFor="quantity">Quantity: </label>
            <Input
              type="number"
              id="quantity"
              onChange={(e) =>
                setAddFormData((prev) => ({
                  ...prev,
                  quantity: e.target.value,
                }))
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => {
                dispatch(addItem(AddFormData));
                onCloseAddModal();
              }}
            >
              Add
            </Button>
            <Button variant="red" onClick={onCloseAddModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* edit modal item */}
      <Modal
        size={"2xl"}
        isCentered
        isOpen={isOpenEditModal}
        onClose={onCloseEditModal}
      >
        <ModalOverlay />
        <ModalContent padding={'30px'}>
          <ModalCloseButton />
          <ModalBody padding={'0px'}>
            <h2 style={{fontWeight:'700',fontSize:'25px',overflow:'clip',whiteSpace:'nowrap',marginRight:'20px'}}>{editdata.name}</h2>
            <p style={{fontWeight:'700',fontSize:'20px',color:'gray'}}>{editdata.brand}</p>
            <div style={{ display: "flex",justifyContent:'space-between'}}>
              <img src={avocado} alt="" width={"28%"} />
              <div style={{ display: "grid",alignItems:'center', width:'70%', gridTemplateColumns: "auto auto"}}>
                <label htmlFor="editPrice">Price ($) :</label>
                <Input defaultValue={editdata.price} type="text" id="editPrice" onChange={(e)=>setEditdata((prev)=>({...prev,"price":e.target.value}))}/>
                <label htmlFor="editQuantity">Quantity :</label>
                <Input defaultValue={editdata.quantity} type="number" id="editQuantity" onChange={(e)=>setEditdata((prev)=>({...prev,"quantity":e.target.value}))}/>
                <p>Total :</p>
                <p>{editdata.price*editdata.quantity}</p>
              </div>
            </div>
            <h3 style={{fontWeight:'700',fontSize:'20px'}}>
              Choose reason <span style={{fontWeight:'500',color:'gray',fontSize:'15px'}}>(optional)</span>
            </h3>
            <Input type="text" />
          </ModalBody>
          <ModalFooter padding={'10px 0px 0px 0px'}>
            <Button
              color="#1e633f"
              fontWeight={"700"}
              colorScheme="transparent"
              onClick={onCloseEditModal}
            >
              Cancel
            </Button>
            <Button colorScheme="green" mr={3} onClick={()=>{dispatch(updateItem(editdata));onCloseEditModal()}}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* message modal */}
      <Modal
        isCentered
        isOpen={isOpenMessageModal}
        onClose={onCloseMessageModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody margin={"20px"}>
            <p style={{ fontWeight: "700", fontSize: "25px" }}>
              Missing Product
            </p>
            <p>Is this product Urgent ?</p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "end" }}
            >
              <Button
                colorScheme="green"
                onClick={() => {
                  dispatch(updateStatus(currentId.current._id, "Missing"));
                  onCloseMessageModal();
                }}
              >
                NO
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  dispatch(
                    updateStatus(currentId.current._id, "Missing–Urgent")
                  );
                  onCloseMessageModal();
                }}
              >
                Yes
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

const ItemWrapper = styled.div`
  margin: auto;
  max-width: 1200px;
  border-radius: 20px;
  border: 3px solid lightgray;
  text-align: start;
  padding: 2vw;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      border-radius: 20px;
      border: 2px solid lightgray;
      outline: none;
      height: 40px;
      width: 400px;
      padding-left: 10px;
      background: url(https://imgs.search.brave.com/zz23j79cuB7aKgqLZjYTVa2SmNrv4rmFf-fyFwr6iiU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy81/ODVlNGFlMWNiMTFi/MjI3NDkxYzMzOTMu/cG5n)
        no-repeat;
      background-size: 6%;
      background-position-x: 96%;
      background-position-y: 40%;
    }
    div {
      display: flex;
      gap: 20px;

      button {
        border: 2px solid #1e633f;
        color: #1e633f;
        background-color: white;
        border-radius: 20px;
        padding: 5px 15px;
        font-weight: bold;
      }
    }
  }
`;

const BtnWrapper = styled.p`
  display: flex;
  gap: 20px;
  button {
    border: none;
  }
`;

const EditModalContet = styled.div`
  h1 {
    font-weight: 700;
    color: red;
  }
`;

export default ShowItems;
