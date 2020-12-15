import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory, useParams } from 'react-router-dom';

const CreateProduct = () => {
    const history = useHistory();
    const restaurant_id = useParams().id;
    if (localStorage.getItem('id')) history.push('/');

    let name = '';
    let genre = '';
    let description = '';
    let price = '';
    const [file_img, setFile_img] = useState(null);

    const onInputFile = (e) => {
        setFile_img(e.target.file[0]);
    };

    const onSubmitProduct = async (e) => {
        e.preventDefault();

        if (!name || !genre || !description || !price || !file_img) {
            Swal.fire('', 'กรุณากรอกข้อมูลให้ครบ', 'error');
            return;
        }

        const data = {
            name: name,
            genre: genre,
            description: description,
            price: price,
            restaurant_id: restaurant_id,
        };
        const formData = new FormData();

        formData.append('file', file_img);
        formData.append('body', JSON.stringify(data));
        try {
            await axios
                .post(`/product`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(function (response) {
                    console.log(response);
                    if (response.status !== 200) {
                        Swal.fire('', 'เกิดข้อผิดพลาด1', 'error');
                        return;
                    }
                    if (response.data.insertId) {
                        Swal.fire('', 'เพิ่มสินค้าเรียบร้อย', 'success');
                        setTimeout(() => {
                            history.push(`/restaurant/${restaurant_id}}`);
                        }, 1000);
                        return;
                    }
                    Swal.fire('', 'แก้ไขเรียบร้อย', 'success');
                })
                .catch(function (error) {
                    Swal.fire('', 'เกิดข้อผิดพลาด2', 'error');
                });
        } catch (err) {
            Swal.fire('', 'ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้', 'error');
            console.log(err);
        }
    };

    return (
        <div className='container-fluid'>
            <div className='py-5 text-center'>
                <h2>สร้างสินค้า</h2>
            </div>

            <div className='row'>
                <div className='col-12'>
                    <div className='row g-3'>
                        <div className='col-12'>
                            <label htmlFor='name' className='form-label'>
                                ชื่อ
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='name'
                                placeholder=''
                                name='name'
                                value={name}
                            />
                            <div className='invalid-feedback'>
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>
                        <div className='col-12'>
                            <label htmlFor='genre' className='form-label'>
                                ประเภท
                            </label>
                            <select className='form-select' id='genre' name='genre' value={genre}>
                                <option value=''>เลือก</option>
                                <option value='clean'>อาหารคลีน</option>
                                <option value='sweet'>ของหวาน</option>
                            </select>
                            <div className='invalid-feedback'>Please select a valid type.</div>
                        </div>
                        <div className='col-12'>
                            <label htmlFor='description' className='form-label'>
                                คำอธิบาย
                            </label>
                            <textarea
                                type='text'
                                className='form-control'
                                id='description'
                                placeholder=''
                                name='description'
                                value={description}
                            />
                            <div className='invalid-feedback'>
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>
                        <div className='col-12'>
                            <label htmlFor='price' className='form-label'>
                                ราคา
                            </label>
                            <input
                                type='number'
                                className='form-control'
                                id='price'
                                placeholder=''
                                name='price'
                                value={price}
                            />
                            <div className='invalid-feedback'>
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>
                        <div className='col-12'>
                            <label htmlFor='img' className='form-label'>
                                รูปร้านค้า
                            </label>
                            <input
                                type='file'
                                className='form-control'
                                id='img'
                                placeholder=''
                                name='img'
                                onChange={onInputFile}
                            />
                            <div className='invalid-feedback'>
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <button className='w-50 btn btn-primary btn-sm' onClick={onSubmitProduct}>
                                เพิ่ม
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
