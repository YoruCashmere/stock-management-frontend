// import { useEffect, useState } from "react";
import Card from "../components/card.components";
// import api from "../../api/axios";
// import LoadingScreen from "../components/loader/LoadingScreen"
// import type { ProductI } from "../interfaces/product.interface";
import Badge from "../components/badge.component";
import ComboBox from "../components/comboBox.component";
import type { warehouseI } from "../interfaces/warehouse.interface";
import { ShoppingBasketIcon } from "lucide-react";
import SalesChart from "../components/charts/graphs/graph.graph";
import { salesData } from "./product.page";
import CircularCircleChart from "../components/charts/pie/circularPieControls.pie";
import StockBarChart from "../components/charts/bar/bar.bar";

export default function SingleProduct() {
    // const [isLoading, setLoading] = useState(true);
    // const [id, setId] = useState("");
    // const [error, setError] = useState<string | null>(null);
    // const [data, setData] = useState<ProductI | null>();
    // useEffect(() => {
    //     const getProductDetails = async () => {
    //         try {
    //             setLoading(true);
    //             setError(null);
    //             const response = await api.get(`/products/${id}`);
    //             if (!response.data) throw new Error("errorr");
    //             setData(response.data);
    //         } catch {
    //             setError("Unable to load inventory. please try again.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     getProductDetails();
    // }, []);
    // if (error) {
    //     return (
    //         <div className="p-6 text-center">
    //             <p className="text-red-600">
    //                 {error}
    //             </p>
    //         </div>
    //     );
    // }
    // if (isLoading) {
    //     // return <LoadingScreen loading={isLoading} onFinished={() => setLoading(false)} />;
    // }
    const warehouses: warehouseI[] = [
        { id: "w001", warehouseName: "Douala Central", position: "cam", region: "lit" },
        { id: "w002", warehouseName: "Yaoundé Main", position: "cam", region: "lit" },
        { id: "w003", warehouseName: "Bafoussam Warehouse", position: "cam", region: "lit" },
        { id: "w004", warehouseName: "Garoua North", position: "cam", region: "nor" },
        { id: "w005", warehouseName: "Bamenda Hub", position: "cam", region: "nw" },
        { id: "w006", warehouseName: "Limbe Depot", position: "cam", region: "sw" },
        { id: "w007", warehouseName: "Douala Central", position: "cam", region: "lit" },
        { id: "w008", warehouseName: "Yaoundé Main", position: "cam", region: "lit" },
        { id: "w0010", warehouseName: "Bafoussam Warehouse", position: "cam", region: "lit" },
        { id: "w0011", warehouseName: "Garoua North", position: "cam", region: "nor" },
        { id: "w0012", warehouseName: "Bamenda Hub", position: "cam", region: "nw" },
        { id: "w0013", warehouseName: "Limbe Depot", position: "cam", region: "sw" },
    ];
    return (
        <section className="shell p-5">
            <Card className="flex justify-between bg-white">
                <div className="flex">
                    <div aria-label="product image" className="">
                        this is for the image
                    </div>
                    <div>
                        <h2 className="text-2xl">{"Frozen Ball"}</h2>
                        <div className="flex justify-between" >
                            <p>SKU: {"LKDK862"}</p>
                            <Badge variant="success" >{"active"}</Badge>
                        </div>
                        <div className="flex justify-between gap-1" >
                            <div>category<p>Fresh Products</p></div>
                            <div>Brand<p>Freshest</p></div>
                        </div>
                        <p className="flex justify-between" >
                            some random info about the product
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <ComboBox label="Variants" placeholder="Products SKUs" warehouses={warehouses}></ComboBox>
                    </div>
                </div>
            </Card>
            <div className="flex">
                <Card className="flex gap-9">
                    <span className="bg-green-200/30">{<ShoppingBasketIcon></ShoppingBasketIcon>}</span>
                    <div>
                        <p>total Units sold</p>
                        <h1 className="text-md">5887</h1>
                        <p>12%</p>
                        <p>vs previos 30</p>
                    </div>
                </Card>
                <Card className="flex gap-9">
                    <span className="bg-green-200/30">{<ShoppingBasketIcon></ShoppingBasketIcon>}</span>
                    <div>
                        <p>total Units sold</p>
                        <h1 className="text-md">5887</h1>
                        <p>12%</p>
                        <p>vs previos 30</p>
                    </div>
                </Card>
                <Card className="flex gap-9">
                    <span className="bg-green-200/30">{<ShoppingBasketIcon></ShoppingBasketIcon>}</span>
                    <div>
                        <p>total Units sold</p>
                        <h1 className="text-md">5887</h1>
                        <p>12%</p>
                        <p>vs previos 30</p>
                    </div>
                </Card>
            </div>
            <div className="flex gap-5">
                <SalesChart data={salesData}></SalesChart>
                <CircularCircleChart categories={salesData} title="Stock per warehouse"></CircularCircleChart>
            </div>
            <div className="flex">
                <StockBarChart></StockBarChart>
            </div>
        </section>
    )
}