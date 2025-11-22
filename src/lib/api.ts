const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://sun.halumai.com/api';

class ApiClient {
  private getHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;

    const response = await fetch(url, {
      headers: this.getHeaders(),
      credentials: 'include',
      mode: 'cors',
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async uploadFile(endpoint: string, formData: FormData): Promise<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${API_BASE}${endpoint}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: 'include',
      mode: 'cors',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(credentials: { name: string; email: string; password: string; phone: string; current_country: string; nationality: string }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async updateProfile(data: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Project endpoints
  async getProjects(status?: string) {
    const query = status ? `?status=${status}` : '';
    return this.request(`/projects${query}`);
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`);
  }

  async createProject(data: {
    name: string;
    description: string;
    total_shares: number;
    price_per_share: number;
  }) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: { name?: string; description?: string }) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async closeProject(id: string, total_profit: number) {
    return this.request(`/projects/${id}/close`, {
      method: 'POST',
      body: JSON.stringify({ total_profit }),
    });
  }

  async archiveProject(id: string) {
    return this.request(`/projects/${id}/archive`, {
      method: 'POST',
    });
  }

  // Share endpoints
  async purchaseShares(data: {
    project_id: string;
    number_of_shares: number;
    paymentProof: File;
    amountSent: number;
    senderAccount: string;
    accountType: string;
  }) {
    const formData = new FormData();
    formData.append('project_id', data.project_id);
    formData.append('number_of_shares', data.number_of_shares.toString());
    formData.append('paymentProof', data.paymentProof);
    formData.append('amountSent', data.amountSent.toString());
    formData.append('senderAccount', data.senderAccount);
    formData.append('accountType', data.accountType);

    return this.uploadFile('/shares/purchase', formData);
  }

  async getMyInvestments() {
    return this.request('/shares/my-investments');
  }

  async getAllShares(status?: string, project_id?: string) {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (project_id) params.append('project_id', project_id);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/shares${query}`);
  }

  async approveShare(id: string, action: 'approve' | 'reject') {
    return this.request(`/shares/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  }

  async getProjectInvestors(id: string) {
    return this.request(`/shares/project/${id}`);
  }

  // Profit endpoints
  async getMyProfits() {
    return this.request('/profits/my-profits');
  }

  async getAllDisbursements() {
    return this.request('/profits/disbursements');
  }

  async getDisbursementSummary(projectId: string) {
    return this.request(`/profits/disbursements/${projectId}`);
  }

  async markProfitsDisbursed(projectId: string) {
    return this.request('/profits/mark-disbursed', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId }),
    });
  }

  // Export endpoints
  async exportProject(id: string, format: 'xlsx' | 'csv' = 'xlsx', includePending: boolean = false) {
    const params = new URLSearchParams();
    params.append('format', format);
    if (includePending) params.append('include_pending', 'true');

    const response = await fetch(`${API_BASE}/export/projects/${id}?${params.toString()}`, {
      headers: this.getHeaders(),
      credentials: 'include',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    return response.blob();
  }

  async exportAllProjects(format: 'xlsx' | 'csv' = 'xlsx') {
    const response = await fetch(`${API_BASE}/export/projects?format=${format}`, {
      headers: this.getHeaders(),
      credentials: 'include',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    return response.blob();
  }

  // Project Image endpoints
  async uploadProjectImages(projectId: string, formData: FormData) {
    return this.uploadFile(`/projects/${projectId}/images`, formData);
  }

  async getProjectImages(projectId: string) {
    return this.request(`/projects/${projectId}/images`);
  }

  async deleteProjectImage(projectId: string, imageId: string) {
    return this.request(`/projects/${projectId}/images/${imageId}`, {
      method: 'DELETE',
    });
  }

  async updateImageOrder(projectId: string, images: Array<{id: string, display_order: number}>) {
    return this.request(`/projects/${projectId}/images/order`, {
      method: 'PUT',
      body: JSON.stringify({ images }),
    });
  }
}

export const api = new ApiClient();