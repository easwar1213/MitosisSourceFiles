using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace KMHSSS
{
    public partial class Month_Master_Frm : Form
    {
        string query, strmmid;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Month_Master_Frm()
        {
            InitializeComponent();
        }

        private void Month_Master_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                Alert_Msg_Lbl.Visible = false;
                Auto_Num();
                Fill_Grid();
                fill_Class_CBox();
                Class_CBox.Focus();
                MM_Date_Dtp.Value = DateTime.Now;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Class_CBox()
        {
            try
            {
                Class_CBox.Items.Clear();
                query = "select Class from Class_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Class_CBox.Items.Add(dr["Class"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Auto_Num()
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("select MM_Id from Month_Master_Table", con);
                String MM_Id = "MMID";
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        MM_Id = dr[0].ToString();
                        MM_Id = MM_Id.Replace("MMID", "");
                        int no = Convert.ToInt32(MM_Id);
                        no++;
                        MM_Id = "MMID" + no.ToString();
                    }
                }
                else
                {
                    MM_Id = "MMID101";
                }
                MM_Id_Txt.Text = MM_Id;
                dr.Close();
                con.Close();
                Class_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Grid()
        {
            try
            {
                query = "select * from Month_Master_Table order by MM_ID desc";          
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Month_Master_dataGridView1.DataSource = dt;
                Month_Master_dataGridView1.ForeColor = Color.Black;
                Month_Master_dataGridView1.Columns[0].HeaderText = "MM Id";
                Month_Master_dataGridView1.Columns[1].HeaderText = "MM Date";
                Month_Master_dataGridView1.Columns[2].HeaderText = "Class";
                Month_Master_dataGridView1.Columns[3].HeaderText = "Month";
                Month_Master_dataGridView1.Columns[0].Width = 100;
                Month_Master_dataGridView1.Columns[1].Width = 110;
                Month_Master_dataGridView1.Columns[2].Width = 80;
                Month_Master_dataGridView1.Columns[3].Width = 120;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Clear_Controls()
        {
            try
            {
                MM_Id_Txt.Text = "";
                MM_Date_Dtp.Text = "";
                Class_CBox.Text = "";
                Month_Txt.Text = "";
                Auto_Num();
                Class_CBox.Focus();
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
                Save_Btn.Enabled = true;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void Add()
        {
            if (MM_Id_Txt.Text != "" && MM_Date_Dtp.Text != "" && Class_CBox.Text != "" && Month_Txt.Text != "")
            {
                try
                {
                    query = "Select * From Month_Master_Table Where Class='" + Class_CBox.Text.ToString().Trim() + "' and Month='" + Month_Txt.Text.ToString().Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        MessageBox.Show("Already Exist");
                    }
                    else
                    {
                        dr.Close();
                        query = "insert into Month_Master_Table values('" + MM_Id_Txt.Text.Trim() + "','" + MM_Date_Dtp.Text.Trim() + "','" + Class_CBox.Text.Trim() + "','" + Month_Txt.Text.Trim() + "')";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();
                        Alert_Msg_Lbl.Visible = true;
                        Alert_Msg_Lbl.Text = "Inserted Successfully";
                    }
                    con.Close();
                    cmd.Cancel();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Updat()
        {
            if (MM_Id_Txt.Text != "" && MM_Date_Dtp.Text != "" && Class_CBox.Text != "" && Month_Txt.Text != "")
            {
                try
                {
                    query = "update Month_Master_Table set Class='" + Class_CBox.Text + "',Month='" + Month_Txt.Text + "' where MM_Id='" + MM_Id_Txt.Text + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Updated Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Del()
        {
            if (MM_Id_Txt.Text != "" && MM_Date_Dtp.Text != "" && Class_CBox.Text != "" && Month_Txt.Text != "")
            {
                try
                {
                    query = "delete Month_Master_Table where MM_Id='" + MM_Id_Txt.Text + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Deleted Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }
       
        private void Month_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                try
                {
                    if (Month_Txt.Text != "")
                    {
                        if (Delete_Btn.Enabled == true)
                        {
                            Updat();
                        }
                        else
                        {
                            Add();
                        }
                        Class_CBox.Focus();
                        Fill_Grid();
                    }
                    else
                    {
                        Alert_Msg_Lbl.Visible = true;
                        Alert_Msg_Lbl.Text = "Please Fill All the Fields";
                    }
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void Class_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Month_Txt.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Month_Master_dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                strmmid = Month_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                MM_Id_Txt.Text = Month_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                MM_Date_Dtp.Text = Month_Master_dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                Class_CBox.Text = Month_Master_dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                Month_Txt.Text = Month_Master_dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
                Update_Btn.Enabled = true;
                Delete_Btn.Enabled = true;
                Clear_Btn.Enabled = true;
                Class_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Save_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Add();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Update_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Updat();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Delete_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Delete", "Delete", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Del();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Clear_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Clear", "Clear", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Clear_Controls();
                    Alert_Msg_Lbl.Text = "";
                    Alert_Msg_Lbl.Visible = false;
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                this.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
