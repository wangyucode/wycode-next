import { useState } from "react";
import Modal from "../modal";
import { Button, Cascader, Form, Input, Space } from "antd";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export default function CodeDialog({apiKey, codeDialogOpen, setCodeDialogOpen, tracks, fetchCodes }) {
    const [form] = Form.useForm();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    async function onSubmit(data) {
        console.log('onSubmit:', data);
        setLoading(true);
        const goods = data.goods.map(g => ({track: g.a[0], count: g.a[1]}));
        data.goods = goods;
        console.log('onSubmit-1:', data);
        await fetch(`https://wycode.cn/api/v1/vending/code`, {
            headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(data)
        });
        fetchCodes();
        setCodeDialogOpen(false);
        setLoading(false);
    }

    function getCountOptions(stock) {
        const children = [];
        for (let i = 1; i <= stock; i++) {
            children.push({ value: i, label: `${i}件` });
        }
        return children;
    }

    const options = tracks.map(t => ({ value: t.track, label: `${t.track}: ${t.name}`, disabled: t.stock < 1, children: getCountOptions(t.stock) }));

    return (
        <Modal isOpen={codeDialogOpen} setIsOpen={setCodeDialogOpen}>
            <Form
                form={form}
                onFinish={onSubmit}>
                <Form.List name="goods" rules={[{
                    validator: async (_, goods) => {
                        if (!goods || goods.length < 1) {
                            return Promise.reject(new Error('至少1个商品'));
                        }
                    },
                }]}>
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="flex gap-1 items-center mb-2">
                                    <Form.Item
                                        {...restField}
                                        className="m-0 flex-1"
                                        name={[name, 'a']}
                                        rules={[{ required: true }]}>
                                        <Cascader options={options} />
                                    </Form.Item>
                                    <MinusCircleIcon className="w-6" onClick={() => remove(name)} />
                                </div>
                            ))}
                            <Button type="dashed" onClick={() => add()} block icon={<PlusCircleIcon />}>
                                增加商品
                            </Button>
                            <Form.ErrorList errors={errors} className="text-red-500 text-start text-xs mt-1" />
                        </>
                    )}
                </Form.List>
                <Form.Item name='code' rules={[{ required: true }]} className="my-2" initialValue={code}>
                    <Space.Compact className="w-full">
                        <Input value={code} placeholder="提货码" onChange={e => setCode(e.target.value)}></Input>
                        <Button onClick={() => {
                            const code = (Math.random() * 1000000).toFixed(0).padStart(6, '0');
                            form.setFieldValue('code', code);
                            setCode(code);
                        }}  >随机</Button>
                    </Space.Compact>
                </Form.Item>
                <button
                    className="w-full mt-2 px-2 py-1 rounded border border-slate-400/30 disabled:bg-slate-500 disabled:active:ring-0 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
                    disabled={loading}
                    type="submit"
                >
                    提交
                </button>

            </Form>
        </Modal>
    )
}