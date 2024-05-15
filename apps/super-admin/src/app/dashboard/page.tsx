'use client';

const SampleShopAdminData = [
    {
        id: 1,
        imageUrl: 'img',
        mallName: 'Dog',
        status: 'Joined',
        mallNumber: '0001',
        createdAt: '2024-05-11'
    },
    {
        id: 2,
        imageUrl: 'img',
        mallName: 'Cat',
        status: 'Joined',
        mallNumber: '0002',
        createdAt: '2024-05-13'
    },
    {
        id: 3,
        imageUrl: 'img',
        mallName: 'Mouse',
        status: 'Withdrawn',
        mallNumber: '0003',
        createdAt: '2024-05-12'
    },
    {
        id: 4,
        imageUrl: 'img',
        mallName: 'Hamster',
        status: 'Withdrawn',
        mallNumber: '0004',
        createdAt: '2024-05-14'
    },
    {
        id: 5,
        imageUrl: 'img',
        mallName: 'Turtle',
        status: 'Joined',
        mallNumber: '0005',
        createdAt: '2024-05-10'
    },
    {
        id: 6,
        imageUrl: 'img',
        mallName: 'Fish',
        status: 'Joined',
        mallNumber: '0006',
        createdAt: '2024-05-11'
    }
];

const hideScrollBar = `
::-webkit-scrollbar {
    display: none;
}
* {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
`;

function DashboardPage() {
    return (
        <div>
            <div style={{backgroundColor: 'white', borderRadius: '10px', padding: '20px', margin: '20px 0px'}}>
                <div style={{width: '100%', height: '300px', overflowY: 'scroll'}}>
                    <style>{hideScrollBar}</style>
                    <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                        <thead style={{position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white'}}>
                        <tr>
                            <th>이미지</th>
                            <th>이름</th>
                            <th>상태</th>
                            <th>번호</th>
                            <th>가입날짜</th>
                        </tr>
                        </thead>
                        <tbody>
                        {SampleShopAdminData.map(mall => (
                            <tr key={mall.id}>
                                <td style={{padding: '15px'}}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        backgroundColor: 'gray',
                                        borderRadius: '20%',
                                        overflow: 'hidden'
                                    }}
                                    >
                                        {/*<img src={mall.imageUrl} alt="Mall"*/}
                                        {/*     style={{width: '100%', height: '100%', objectFit: 'cover'}}/>*/}
                                    </div>
                                </td>
                                <td>{mall.mallName}</td>
                                <td>{mall.status}</td>
                                <td>{mall.mallNumber}</td>
                                <td>{mall.createdAt}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;

