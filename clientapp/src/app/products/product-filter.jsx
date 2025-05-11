'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
export default function ProductFilters({filters}) {
    const sortOrder = filters.sortOrder ||[]
    const groups = filters.groups || []
    const brands = filters.brands || []

    return (
        <div className="space-y-4">
            {/* Price Range */}
            <Select onValueChange={(value) => console.log(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select sort order" />
                </SelectTrigger>
                <SelectContent>
                    {sortOrder && sortOrder.map(({ name, value }, index) => (
                        <SelectItem key={index} value={value}>
                            {name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="space-y-2">
                <h3 className="font-medium">Price Range</h3>
                <div className="px-2">
                    <Slider defaultValue={[0, 500]} max={1000} step={10} className="my-6" />
                    <div className="flex items-center justify-between">
                        <div className="text-sm">$0</div>
                        <div className="text-sm">$1000</div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <Accordion type="multiple" defaultValue={["categories"]} className="w-full">
                <AccordionItem value="categories">
                    <AccordionTrigger className="font-medium py-2">Danh mục sản phẩm</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {groups && groups.map(({ id, name,categories }) => (
                                <div key={id} className="flex items-center space-x-2">
                                    <Accordion type="single" defaultValue={name} className="w-full">
                                        <AccordionItem value={name}>
                                            <AccordionTrigger className="font-medium py-2">{name}</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="space-x-2">
                                                    {categories.map(({id,name}) => (
                                                        <div key={id} className="flex items-center space-x-2">
                                                            <Checkbox id={id.toString()} />
                                                            <Label htmlFor={id.toString()}>{name}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Brands */}
                <AccordionItem value="brands">
                    <AccordionTrigger className="font-medium py-2">Thương hiệu</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="nike" />
                                <Label htmlFor="nike">Nike</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="adidas" />
                                <Label htmlFor="adidas">Adidas</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="puma" />
                                <Label htmlFor="puma">Puma</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="reebok" />
                                <Label htmlFor="reebok">Reebok</Label>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Ratings */}
                <AccordionItem value="ratings">
                    <AccordionTrigger className="font-medium py-2">Ratings</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="rating-4" />
                                <Label htmlFor="rating-4">4★ & Above</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="rating-3" />
                                <Label htmlFor="rating-3">3★ & Above</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="rating-2" />
                                <Label htmlFor="rating-2">2★ & Above</Label>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* Apply/Reset Buttons */}
            <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1">
                    Reset
                </Button>
                <Button className="flex-1">Apply</Button>
            </div>
        </div>
    )
}
