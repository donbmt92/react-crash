import { useState } from 'react';
import classes from './NewPost.module.css';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewTaxes() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    tax: '',
  });
  const [upLoadScreen, setUploadScreen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeCompanyInfo = (e) => {
    setCompanyInfo({
      ...companyInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const result = await axios.post(
        'http://localhost:4000/api/search',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(result.data.companyInfo);
      setCompanyInfo(result.data.companyInfo);
      setUploadScreen(true);
      // Redirect to home page after successful submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(companyInfo);
    try {
      await axios.post('http://localhost:4000/api/upload', companyInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUploadScreen(false);
      navigate('/');
      // Redirect to home page after successful submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal>
      {upLoadScreen ? null : (
        <form onSubmit={handleSubmit} className={classes.form}>
          <p>
            <label htmlFor="tax">CCCD/MST</label>
            <input
              type="text"
              id="tax"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              required
            />
          </p>
          <p className={classes.actions}>
            <Link to="..">Cancel</Link>
            <button type="submit">Submit</button>
          </p>
        </form>
      )}
      {!upLoadScreen ? null : (
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

            <select name="status" id="status" value={companyInfo.status}>
              <option value="1">đang hoạt động,</option>
              <option value="2">tạm ngưng</option>
              <option value="3">đã giải thể</option>
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
            <Link to="..">Cancel</Link>
            <button type="submit">Submit</button>
          </p>
        </form>
      )}
    </Modal>
  );
}

export default NewTaxes;
