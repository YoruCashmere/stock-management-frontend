import { useState } from 'react'
import './App.css'
import Card from './components/card.components'
import Button from './components/button.components'
import Badge from './components/badge.component'
import Input from './components/input.component'
import Select from './components/select.component'
import ComboBox from './components/comboBox.component'
import type { warehouseI } from './interfaces/warehouse.interface'
import { Loader, Skeleton } from './components/skeletonAndLoader.component'

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

function App() {
  const [warehouseId, setWarehouseId] = useState("");

  return (
    <div className="min-h-screen bg-brand-gold p-10">
      <Card>
        <h1 className="text-2xl font-bold text-brand-forest">StockLens</h1>
        <p className="mt-2 text-brand-forest">Inventory intelligence</p>
      </Card>

      <Card>
        <h2>Normal card</h2>
      </Card>

      <Card variant="elevated" size="lg" className="bg-red-500">
        <h2>Large elevated card</h2>
      </Card>

      <Card variant="danger" size="sm">
        <h2>Danger card</h2>
      </Card>

      <Button variant="primary">Add Product</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="danger">Delete</Button>
      <Button variant="ghost">View Details</Button>

      <Badge variant="success">In Stock</Badge>
      <Badge variant="danger">Critical</Badge>
      <Badge variant="warning">Expiring</Badge>
      <Badge variant="info">In Transit</Badge>
      <Badge variant="insight">Demand Spike</Badge>
      <Badge variant="pending">Pending</Badge>

      <div className="w-96">
        <Input label="Product name" error="Product not found" />
      </div>

      <div className="mt-5 w-96">
        <Select label="Warehouse">
          <option value="">Select warehouse</option>
          <option value="douala">Douala Warehouse</option>
          <option value="yaounde">Yaoundé Warehouse</option>
          <option value="bafoussam">Bafoussam Warehouse</option>
        </Select>
      </div>

      <div className="mt-5 w-96">
        <ComboBox
          warehouses={warehouses}
          label="Warehouse"
          value={warehouseId}
          onValueChange={setWarehouseId}
        />
      </div>
      <Loader/>
      <Skeleton/>
      <Input className='w-[25vh] focus:py-3'></Input>
    </div>
  )
}

export default App