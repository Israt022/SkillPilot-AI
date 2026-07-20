import { Input, Select, ListBox } from "@heroui/react";

export default function ExploreFilters(props: any) {

    return (

        <div className="mb-8 grid gap-4 md:grid-cols-3">

            <Input

                placeholder="Search..."

                value={props.search}
                onChange={(e) => props.setSearch(e.target.value)}
            />

            <Select
                selectedKey={props.category}
                onSelectionChange={(key) => {
                    props.setCategory(String(key));
                }}
            >
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="All">All</ListBox.Item>
                        <ListBox.Item id="Frontend">Frontend</ListBox.Item>
                        <ListBox.Item id="Backend">Backend</ListBox.Item>
                        <ListBox.Item id="AI">AI</ListBox.Item>
                        <ListBox.Item id="Career">Career</ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>

            {/* Level */}
            <Select
                selectedKey={props.level}
                onSelectionChange={(key) => {
                    props.setLevel(String(key));
                }}
            >
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="All">All</ListBox.Item>
                        <ListBox.Item id="Beginner">Beginner</ListBox.Item>
                        <ListBox.Item id="Intermediate">Intermediate</ListBox.Item>
                        <ListBox.Item id="Advanced">Advanced</ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>

        </div>

    )

}