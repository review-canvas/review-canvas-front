'use client';

import React from 'react';

const SampleData = [
    {
        id: 1,
        imageUrl: 'path_to_image1',
        mallName: 'Sample Mall 1',
        status: 'Open',
        mallNumber: '1234',
        createdAt: '2024-05-14'
    },
    {
        id: 2,
        imageUrl: 'path_to_image2',
        mallName: 'Sample Mall 2',
        status: 'Closed',
        mallNumber: '5678',
        createdAt: '2024-05-13'
    },
    {
        id: 1,
        imageUrl: 'path_to_image1',
        mallName: 'Sample Mall 1',
        status: 'Open',
        mallNumber: '1234',
        createdAt: '2024-05-14'
    },
    {
        id: 2,
        imageUrl: 'path_to_image2',
        mallName: 'Sample Mall 2',
        status: 'Closed',
        mallNumber: '5678',
        createdAt: '2024-05-13'
    },
    {
        id: 1,
        imageUrl: 'path_to_image1',
        mallName: 'Sample Mall 1',
        status: 'Open',
        mallNumber: '1234',
        createdAt: '2024-05-14'
    },
    {
        id: 2,
        imageUrl: 'path_to_image2',
        mallName: 'Sample Mall 2',
        status: 'Closed',
        mallNumber: '5678',
        createdAt: '2024-05-13'
    },
    {
        id: 1,
        imageUrl: 'path_to_image1',
        mallName: 'Sample Mall 1',
        status: 'Open',
        mallNumber: '1234',
        createdAt: '2024-05-14'
    },
    {
        id: 2,
        imageUrl: 'path_to_image2',
        mallName: 'Sample Mall 2',
        status: 'Closed',
        mallNumber: '5678',
        createdAt: '2024-05-13'
    },
    {
        id: 1,
        imageUrl: 'path_to_image1',
        mallName: 'Sample Mall 1',
        status: 'Open',
        mallNumber: '1234',
        createdAt: '2024-05-14'
    },
    {
        id: 2,
        imageUrl: 'path_to_image2',
        mallName: 'Sample Mall 2',
        status: 'Closed',
        mallNumber: '5678',
        createdAt: '2024-05-13'
    },
    {
        id: 1,
        imageUrl: 'path_to_image1',
        mallName: 'Sample Mall 1',
        status: 'Open',
        mallNumber: '1234',
        createdAt: '2024-05-14'
    },
    {
        id: 2,
        imageUrl: 'path_to_image2',
        mallName: 'Sample Mall 2',
        status: 'Closed',
        mallNumber: '5678',
        createdAt: '2024-05-13'
    },
    {
        id: 1,
        imageUrl: 'path_to_image1',
        mallName: 'Sample Mall 1',
        status: 'Open',
        mallNumber: '1234',
        createdAt: '2024-05-14'
    },
    {
        id: 2,
        imageUrl: 'path_to_image2',
        mallName: 'Sample Mall 2',
        status: 'Closed',
        mallNumber: '5678',
        createdAt: '2024-05-13'
    },
    {
        id: 1,
        imageUrl: 'path_to_image1',
        mallName: 'Sample Mall 1',
        status: 'Open',
        mallNumber: '1234',
        createdAt: '2024-05-14'
    },
    {
        id: 2,
        imageUrl: 'path_to_image2',
        mallName: 'Sample Mall 2',
        status: 'Closed',
        mallNumber: '5678',
        createdAt: '2024-05-13'
    }, {
        id: 1,
        imageUrl: 'path_to_image1',
        mallName: 'Sample Mall 1',
        status: 'Open',
        mallNumber: '1234',
        createdAt: '2024-05-14'
    },
    {
        id: 2,
        imageUrl: 'path_to_image2',
        mallName: 'Sample Mall 2',
        status: 'Closed',
        mallNumber: '5678',
        createdAt: '2024-05-13'
    },

];

function DashboardPage() {
    return (
        <div>
            <div style={{backgroundColor: 'white', borderRadius: '10px', padding: '20px', margin: '20px 0px'}}>
                <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Mall Name</th>
                        <th>Status</th>
                        <th>Mall Number</th>
                        <th>Created At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Mapping through sample data */}
                    {SampleData.map(mall => (
                        <tr key={mall.id}>
                            <td style={{padding: '15px'}}>
                                {/* Drawing gray, circular rect */}
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: 'gray',
                                    borderRadius: '20%',
                                    overflow: 'hidden'
                                }}>
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
    );
}

export default DashboardPage;

