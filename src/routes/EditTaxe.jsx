import { useEffect, useState } from 'react';
import classes from './NewPost.module.css';
import Modal from '../components/Modal';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditTaxe() {
  const [companyInfo, setCompanyInfo] = useState({});
  const param = useParams();
  const navigate = useNavigate();
  const handleChangeCompanyInfo = (e) => {
    setCompanyInfo({
      ...companyInfo,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    async function getTaxe() {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/get/${param.id}`
        );
        setCompanyInfo(response?.data.result);
      } catch (error) {
        console.log(error);
      }
    }
    getTaxe();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log('aaa');
    try {
      console.log(companyInfo);
      await axios.patch(
        `http://localhost:4000/api/update/${param.id}`,
        companyInfo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/');
      // Chỉ thực hiện setTimeout nếu kết quả của yêu cầu là thành công (ví dụ: mã trạng thái là 200)

      // Redirect to home page after successful submission
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    console.log('aaa');
    try {
      console.log(companyInfo);
      const result = await axios.delete(
        `http://localhost:4000/api/delete/${param.id}`,
        companyInfo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleUpload} className={classes.form}>
        <p>
          <label htmlFor="tax">Mã Số Thuế</label>
          <input
            type="text"
            id="taxeCode"
            name="taxeCode"
            value={companyInfo.taxeCode}
            onChange={handleChangeCompanyInfo}
            required
          />
          <label htmlFor="tax">Tên Công Ty</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={companyInfo.companyName}
            onChange={handleChangeCompanyInfo}
            required
          />
          <label htmlFor="tax">Địa Chỉ</label>
          <input
            type="text"
            id="address"
            name="address"
            value={companyInfo.address}
            onChange={handleChangeCompanyInfo}
            required
          />
          <label htmlFor="tax">Người Sở Hữu</label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={companyInfo.owner}
            onChange={handleChangeCompanyInfo}
            required
          />
          <label htmlFor="tax">Ngày hoạt động</label>
          <input
            type="text"
            id="operatingDay"
            name="operatingDay"
            value={companyInfo.operatingDay}
            onChange={handleChangeCompanyInfo}
            required
          />
          <label htmlFor="tax">Quản lý bởi</label>
          <input
            type="text"
            id="managed_by"
            name="managed_by"
            value={companyInfo.managed_by}
            onChange={handleChangeCompanyInfo}
            required
          />
          <label htmlFor="tax">Tình trạng</label>

          <select
            name="status"
            id="status"
            value={companyInfo.status}
            onChange={handleChangeCompanyInfo}
          >
            <option value="0">đang hoạt động</option>
            <option value="1">tạm ngưng</option>
            <option value="2">đã giải thể</option>
          </select>
          <label htmlFor="tax">dateUpdate</label>
          <input
            type="text"
            id="dateUpdate"
            name="dateUpdate"
            value={companyInfo.dateUpdate}
            onChange={handleChangeCompanyInfo}
            required
          />
        </p>

        <p className={classes.actions}>
          <button onClick={handleDelete}>Delete</button>
          <button type="submit">Update</button>
        </p>
      </form>
    </Modal>
  );
}

export default EditTaxe;
