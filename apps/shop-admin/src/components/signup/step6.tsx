'use client';

import { useState } from 'react';

import useSignupStore from '@/store/signup';

function Step6() {
  const { goToNextStep, updateSignupUserInfo } = useSignupStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mallNumber, setMallNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [logoImage, setLogoImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setLogoImage(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    updateSignupUserInfo({
      email,
      password,
      name,
      mallNumber,
      phoneNumber,
      logoImage,
    });
    
    goToNextStep()
  };

  return (
    <div>
      <div>샵에 대한 정보를 설정합니다</div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); }}
          placeholder="이메일"
        />
        <input
          type="password" // 비밀번호 입력 필드
          value={password}
          onChange={(e) => { setPassword(e.target.value); }}
          placeholder="비밀번호"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); }}
          placeholder="이름"
        />
        <input
          type="text"
          value={mallNumber}
          onChange={(e) => { setMallNumber(e.target.value); }}
          placeholder="상점 번호"
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => { setPhoneNumber(e.target.value); }}
          placeholder="전화번호"
        />
        <input
          type="file"
          onChange={handleImageChange}
        />
      </div>
      <div>
        <button
          onClick={handleSubmit}
          type="button"
        >정보 제출
        </button>
      </div>
    </div>
  );
}

export default Step6;
